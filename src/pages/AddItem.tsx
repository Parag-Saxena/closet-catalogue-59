
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AddClothingForm from '../components/AddClothingForm';

const AddItem = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-closet-gray-dark mb-1">Add New Item</h1>
        <p className="text-closet-gray-medium mb-6">Fill in the details below to add a new item to your closet</p>
        <AddClothingForm />
      </div>
    </Layout>
  );
};

export default AddItem;
