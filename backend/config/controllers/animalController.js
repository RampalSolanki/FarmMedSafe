import Animal from '../models/Animal.js';

export const addAnimal = async (req, res) => {
  try {
    const animal = await Animal.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({ user: req.user._id, isActive: true });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    if (animal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    if (animal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    if (animal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    animal.isActive = false;
    await animal.save();
    res.json({ message: 'Animal removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};