
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
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
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Plus, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ShoppingSchedule {
  id: string;
  itemName: string;
  store: string;
  date: string;
  budget?: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  isOnline: boolean;
}

const ShoppingSchedule = () => {
  const [schedules, setSchedules] = useState<ShoppingSchedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ShoppingSchedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'online' | 'offline'>('all');
  const { toast } = useToast();

  // Form fields
  const [itemName, setItemName] = useState('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Load schedules from localStorage
    const storedSchedules = JSON.parse(localStorage.getItem('shoppingSchedules') || '[]');
    setSchedules(storedSchedules);
  }, []);

  useEffect(() => {
    // Save schedules to localStorage whenever they change
    localStorage.setItem('shoppingSchedules', JSON.stringify(schedules));
  }, [schedules]);

  const resetForm = () => {
    setItemName('');
    setStore('');
    setDate(new Date());
    setBudget('');
    setPriority('medium');
    setNotes('');
    setIsOnline(false);
    setEditingSchedule(null);
  };

  const handleOpenDialog = (schedule?: ShoppingSchedule) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setItemName(schedule.itemName);
      setStore(schedule.store);
      setDate(new Date(schedule.date));
      setBudget(schedule.budget || '');
      setPriority(schedule.priority);
      setNotes(schedule.notes || '');
      setIsOnline(schedule.isOnline);
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
    
    if (!itemName.trim() || !store.trim() || !date) {
      toast({
        title: "Error",
        description: "Item name, store, and date are required",
        variant: "destructive"
      });
      return;
    }

    if (editingSchedule) {
      // Update existing schedule
      const updatedSchedules = schedules.map(s => 
        s.id === editingSchedule.id 
          ? { 
              ...s, 
              itemName,
              store,
              date: date.toISOString(),
              budget: budget.trim() || undefined,
              priority,
              notes: notes.trim() || undefined,
              isOnline
            } 
          : s
      );
      setSchedules(updatedSchedules);
      
      toast({
        title: "Shopping schedule updated",
        description: `Shopping plan for ${itemName} has been updated successfully.`
      });
    } else {
      // Add new schedule
      const newSchedule: ShoppingSchedule = {
        id: Date.now().toString(),
        itemName,
        store,
        date: date.toISOString(),
        budget: budget.trim() || undefined,
        priority,
        notes: notes.trim() || undefined,
        isOnline
      };
      
      setSchedules([...schedules, newSchedule]);
      
      toast({
        title: "Shopping schedule added",
        description: `Shopping plan for ${itemName} has been added to your schedule.`
      });
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    const scheduleToDelete = schedules.find(s => s.id === id);
    if (!scheduleToDelete) return;

    const updatedSchedules = schedules.filter(s => s.id !== id);
    setSchedules(updatedSchedules);
    
    toast({
      title: "Shopping schedule deleted",
      description: `Shopping plan for ${scheduleToDelete.itemName} has been removed.`
    });
  };

  // Filter schedules based on the selected filter type
  const filteredSchedules = schedules.filter(schedule => {
    if (filterType === 'all') return true;
    if (filterType === 'online') return schedule.isOnline;
    if (filterType === 'offline') return !schedule.isOnline;
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group schedules by month
  const groupedSchedules: Record<string, ShoppingSchedule[]> = {};
  filteredSchedules.forEach(schedule => {
    const monthYear = format(new Date(schedule.date), 'MMMM yyyy');
    if (!groupedSchedules[monthYear]) {
      groupedSchedules[monthYear] = [];
    }
    groupedSchedules[monthYear].push(schedule);
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">Shopping Schedule</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Shopping Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSchedule ? 'Edit' : 'Add'} Shopping Plan</DialogTitle>
                <DialogDescription>
                  {editingSchedule 
                    ? 'Update your shopping plan details below.' 
                    : 'Enter your shopping plan details below.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemName" className="text-right">
                      Item
                    </Label>
                    <Input
                      id="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g., Winter Coat, Dress Shoes"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="store" className="text-right">
                      Store
                    </Label>
                    <Input
                      id="store"
                      value={store}
                      onChange={(e) => setStore(e.target.value)}
                      placeholder="e.g., Zara, Amazon"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <Input
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g., $100"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <div className="col-span-3">
                      <Tabs value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="low">Low</TabsTrigger>
                          <TabsTrigger value="medium">Medium</TabsTrigger>
                          <TabsTrigger value="high">High</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isOnline" className="text-right">
                      Shopping Type
                    </Label>
                    <div className="col-span-3">
                      <Tabs value={isOnline ? "online" : "offline"} onValueChange={(value) => setIsOnline(value === "online")}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="offline">In-Store</TabsTrigger>
                          <TabsTrigger value="online">Online</TabsTrigger>
                        </TabsList>
                      </Tabs>
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
                    {editingSchedule ? 'Update' : 'Add'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="all" onValueChange={(value) => setFilterType(value as 'all' | 'online' | 'offline')}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="offline">In-Store</TabsTrigger>
            </TabsList>
            
            <TabsContent value={filterType} className="mt-6">
              {Object.keys(groupedSchedules).length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-lg">
                  <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No shopping plans yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your shopping plans to keep track of your upcoming purchases.
                  </p>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shopping Plan
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedSchedules).map(([monthYear, monthSchedules]) => (
                    <div key={monthYear} className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">{monthYear}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {monthSchedules.map((schedule) => (
                          <Card key={schedule.id} className={cn(
                            "border-l-4",
                            schedule.priority === 'high' ? "border-l-red-500" :
                            schedule.priority === 'medium' ? "border-l-amber-500" :
                            "border-l-green-500"
                          )}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{schedule.itemName}</CardTitle>
                              <CardDescription>
                                {schedule.store} • {schedule.isOnline ? 'Online' : 'In-Store'}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{format(new Date(schedule.date), 'PPP')}</span>
                              </div>
                              {schedule.budget && (
                                <p><span className="font-medium">Budget:</span> {schedule.budget}</p>
                              )}
                              {schedule.notes && (
                                <p className="text-sm text-muted-foreground">{schedule.notes}</p>
                              )}
                            </CardContent>
                            <CardFooter className="pt-0 flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleOpenDialog(schedule)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleDelete(schedule.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingSchedule;
