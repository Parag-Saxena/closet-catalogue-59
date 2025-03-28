
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Ruler, Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MeasurementType = 'clothes' | 'shoes' | 'accessories';

interface Measurement {
  id: string;
  type: MeasurementType;
  name: string;
  value: string;
  unit: string;
  notes?: string;
}

const Measurements = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [editingMeasurement, setEditingMeasurement] = useState<Measurement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MeasurementType>('clothes');
  const { toast } = useToast();

  // Form fields
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('cm');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load measurements from localStorage
    const storedMeasurements = JSON.parse(localStorage.getItem('measurements') || '[]');
    setMeasurements(storedMeasurements);
  }, []);

  useEffect(() => {
    // Save measurements to localStorage whenever they change
    localStorage.setItem('measurements', JSON.stringify(measurements));
  }, [measurements]);

  const resetForm = () => {
    setName('');
    setValue('');
    setUnit('cm');
    setNotes('');
    setEditingMeasurement(null);
  };

  const handleOpenDialog = (measurement?: Measurement) => {
    if (measurement) {
      setEditingMeasurement(measurement);
      setName(measurement.name);
      setValue(measurement.value);
      setUnit(measurement.unit);
      setNotes(measurement.notes || '');
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !value.trim()) {
      toast({
        title: "Error",
        description: "Name and value are required",
        variant: "destructive"
      });
      return;
    }

    if (editingMeasurement) {
      // Update existing measurement
      const updatedMeasurements = measurements.map(m => 
        m.id === editingMeasurement.id 
          ? { ...m, name, value, unit, notes, type: activeTab } 
          : m
      );
      setMeasurements(updatedMeasurements);
      
      toast({
        title: "Measurement updated",
        description: `${name} has been updated successfully.`
      });
    } else {
      // Add new measurement
      const newMeasurement: Measurement = {
        id: Date.now().toString(),
        type: activeTab,
        name,
        value,
        unit,
        notes: notes.trim() || undefined
      };
      
      setMeasurements([...measurements, newMeasurement]);
      
      toast({
        title: "Measurement added",
        description: `${name} has been added to your measurements.`
      });
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    const measurementToDelete = measurements.find(m => m.id === id);
    if (!measurementToDelete) return;

    const updatedMeasurements = measurements.filter(m => m.id !== id);
    setMeasurements(updatedMeasurements);
    
    toast({
      title: "Measurement deleted",
      description: `${measurementToDelete.name} has been removed from your measurements.`
    });
  };

  const filteredMeasurements = measurements.filter(m => m.type === activeTab);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Ruler className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">My Measurements</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Measurement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMeasurement ? 'Edit' : 'Add'} Measurement</DialogTitle>
                <DialogDescription>
                  {editingMeasurement 
                    ? 'Update your measurement details below.' 
                    : 'Enter your measurement details below.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="measurement-type" className="text-right">
                      Type
                    </Label>
                    <div className="col-span-3">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger 
                          value="clothes" 
                          onClick={() => setActiveTab('clothes')}
                          data-state={activeTab === 'clothes' ? 'active' : ''}
                        >
                          Clothes
                        </TabsTrigger>
                        <TabsTrigger 
                          value="shoes" 
                          onClick={() => setActiveTab('shoes')}
                          data-state={activeTab === 'shoes' ? 'active' : ''}
                        >
                          Shoes
                        </TabsTrigger>
                        <TabsTrigger 
                          value="accessories" 
                          onClick={() => setActiveTab('accessories')}
                          data-state={activeTab === 'accessories' ? 'active' : ''}
                        >
                          Accessories
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Waist, Chest, Shoe Size"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">
                      Value
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input
                        id="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="e.g., 32, 42, 9.5"
                        className="flex-1"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                        <option value="EU">EU</option>
                        <option value="US">US</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Input
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional notes"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingMeasurement ? 'Update' : 'Add'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="clothes" onValueChange={(value) => setActiveTab(value as MeasurementType)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="clothes">Clothes</TabsTrigger>
              <TabsTrigger value="shoes">Shoes</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
            
            {['clothes', 'shoes', 'accessories'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredMeasurements.length === 0 ? (
                  <div className="text-center py-10 border border-dashed rounded-lg">
                    <Ruler className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No measurements yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your {tabValue} measurements to keep track of your sizes.
                    </p>
                    <Button onClick={() => handleOpenDialog()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Measurement
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMeasurements.map((measurement) => (
                      <Card key={measurement.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{measurement.name}</CardTitle>
                          <CardDescription>
                            {measurement.type.charAt(0).toUpperCase() + measurement.type.slice(1)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-semibold">
                            {measurement.value} <span className="text-sm">{measurement.unit}</span>
                          </p>
                          {measurement.notes && (
                            <p className="text-sm text-muted-foreground mt-2">{measurement.notes}</p>
                          )}
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleOpenDialog(measurement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleDelete(measurement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Measurements;
