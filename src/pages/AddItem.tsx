
import { useState } from 'react';
import Layout from '../components/Layout';
import AddClothingForm from '../components/AddClothingForm';
import { motion } from 'framer-motion';

const AddItem = () => {
  return (
    <Layout>
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold mb-1">Add New Item</h1>
        <p className="text-muted-foreground mb-6">Fill in the details below to add a new item to your closet</p>
        <AddClothingForm />
      </motion.div>
    </Layout>
  );
};

export default AddItem;
