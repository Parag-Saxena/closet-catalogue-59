
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ClothingCard from '../components/ClothingCard';
import EmptyState from '../components/EmptyState';
import EditItemDialog from '../components/EditItemDialog';
import { ClothingItem } from '../components/ClothingCard';
import { Search, Plus, WashingMachine, Edit, Trash2, List, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [laundryFilter, setLaundryFilter] = useState<'all' | 'clean' | 'wash'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page
  const { toast } = useToast();

  // Get unique categories from items
  const categories = ['All', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For this demo, we'll use localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    setItems(storedItems);
    setFilteredItems(storedItems);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter items based on search query, category, and laundry status
    let filtered = [...items];
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    if (laundryFilter !== 'all') {
      filtered = filtered.filter(item => 
        laundryFilter === 'wash' ? item.needsWashing : !item.needsWashing
      );
    }
    
    setFilteredItems(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, laundryFilter, items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLaundryToggle = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, needsWashing: !item.needsWashing } : item
    );
    setItems(updatedItems);
    
    // Update localStorage
    localStorage.setItem('closetItems', JSON.stringify(updatedItems));
    
    // Show confirmation toast
    const item = items.find(item => item.id === id);
    if (item) {
      toast({
        title: item.needsWashing ? "Marked as clean" : "Added to laundry",
        description: `${item.name} has been ${item.needsWashing ? "removed from" : "added to"} your laundry list.`
      });
    }
  };

  const handleEditItem = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setEditingItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveItem = (updatedItem: ClothingItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    
    // Update localStorage
    localStorage.setItem('closetItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item updated",
      description: `${updatedItem.name} has been updated successfully.`
    });
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id);
    if (!itemToDelete) return;

    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    // Update localStorage
    localStorage.setItem('closetItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item deleted",
      description: `${itemToDelete.name} has been removed from your wardrobe.`
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const laundryCount = items.filter(item => item.needsWashing).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">My Wardrobe</h1>
          <Link
            to="/add"
            className="inline-flex items-center justify-center rounded-full h-10 px-4 py-2 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95 dark:bg-blue-600"
            aria-label="Add new item"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Item</span>
          </Link>
        </div>
        
        {items.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search your wardrobe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 rounded-full border border-input bg-background px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={laundryFilter === 'all' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLaundryFilter('all')}
                    className="rounded-full"
                  >
                    All Items
                  </Button>
                  <Button 
                    variant={laundryFilter === 'clean' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLaundryFilter('clean')}
                    className="rounded-full"
                  >
                    Clean Items
                  </Button>
                  <Button 
                    variant={laundryFilter === 'wash' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setLaundryFilter('wash')}
                    className="rounded-full flex items-center gap-1"
                  >
                    <WashingMachine className="h-4 w-4" />
                    Laundry ({laundryCount})
                  </Button>
                </div>
                
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'card' | 'list')}>
                  <ToggleGroupItem value="card" aria-label="Card View">
                    <Grid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List View">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            {paginatedItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No items found matching your search.</p>
              </div>
            ) : viewMode === 'card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                {paginatedItems.map(item => (
                  <div key={item.id} className="group relative">
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {item.name} from your wardrobe.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <ClothingCard 
                      item={item} 
                      onLaundryToggle={handleLaundryToggle} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            {item.color}
                          </div>
                        </TableCell>
                        <TableCell>{item.brand || '-'}</TableCell>
                        <TableCell>
                          {item.needsWashing ? (
                            <span className="text-amber-500 flex items-center gap-1">
                              <WashingMachine className="h-3 w-3" /> Needs washing
                            </span>
                          ) : (
                            <span className="text-green-500">Clean</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleLaundryToggle(item.id)}
                            >
                              {item.needsWashing ? 'Mark Clean' : 'Add to Laundry'}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditItem(item.id)}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete {item.name} from your wardrobe.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="my-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>

      {/* Edit Item Dialog */}
      <EditItemDialog 
        item={editingItem}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />
    </Layout>
  );
};

export default Wardrobe;
