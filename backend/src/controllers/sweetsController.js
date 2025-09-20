const Sweet = require('../models/Sweet');

exports.create = async (req, res, next) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    const sweet = await Sweet.create({ name, category, price, quantity, description });
    res.status(201).json(sweet);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Sweet name must be unique' });
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { page = 1, per_page = 20 } = req.query;
    const skip = (Math.max(1, page) - 1) * per_page;
    const items = await Sweet.find().skip(skip).limit(parseInt(per_page));
    const total = await Sweet.countDocuments();
    res.json({ items, total, page: Number(page), per_page: Number(per_page) });
  } catch (err) { next(err); }
};

exports.search = async (req, res, next) => {
  try {
    const { q, category, min_price, max_price } = req.query;
    const filter = {};
    if (q) filter.name = new RegExp(q, 'i');
    if (category) filter.category = category;
    if (min_price) filter.price = Object.assign(filter.price || {}, { $gte: Number(min_price) });
    if (max_price) filter.price = Object.assign(filter.price || {}, { $lte: Number(max_price) });

    const items = await Sweet.find(filter);
    res.json({ items });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const sweet = await Sweet.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.status(204).end();
  } catch (err) { next(err); }
};
