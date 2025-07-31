import { customAlphabet } from "nanoid";
import orderMdoel from "../../DataBase/models/order.mdoel.js";
import productModel from "../../DataBase/models/product.model.js";
import { AppError } from "../utilities/AppError.js";
import { handlerAsync } from "../utilities/handleAsync.js";
import tableModel from "../../DataBase/models/Tables.model.js";
export const createOrder = handlerAsync(async (req, res, next) => {
  const { items, orderType, location, table } = req.body;
  let totalPrice = 0;
  for (const item of items) {
    const product = await productModel.findById({ _id: item.product });
    if (!product) return next(new AppError("product not found", 404));
    let addtionalPrice = 0;
    if (
      item?.customizations &&
      item?.customizations?.extrasWithPrices &&
      item?.customizations?.extrasWithPrices.length
    ) {
      addtionalPrice = item?.customizations?.extrasWithPrices.reduce(
        (acc, curr) => acc + Number(curr.price),
        0
      );
    }
    totalPrice += product.price * item.quantity + addtionalPrice;
  }

  const nanoidNumber = customAlphabet("0123456789", 6);

  if (table) {
    await tableModel.findByIdAndUpdate(table, { status: "Occupied" });
  }
  const randomNumber = nanoidNumber();

  const order = await orderMdoel.create({
    items,
    orderType,
    OrderNumber: randomNumber,
    table: table || null,
    location: location ?? "",
    totalPrice,
    customer: req.user._id,
  });

  res.status(201).json({ message: "order created successfully" });
});
export const updateOrder = handlerAsync(async (req, res, next) => {
  const { id } = req.params;
  const orderExist = await orderMdoel.findById({ _id: id });
  if (!orderExist) next(new AppError("order not found", 404));
  await orderMdoel.findByIdAndUpdate({ _id: id }, req.body);
  res.status(200).json({ message: "order updated successfully" });
});
export const updateOrderStatus = handlerAsync(async (req, res, next) => {
  const { orderId, itemId, status } = req.body;
  const orderExist = await orderMdoel.findById({ _id: orderId });
  if (!orderExist) return next(new AppError("order not found", 404));

  const item = orderExist.items.find((ele) => ele._id.toString() == itemId);

  item.innerStatus = status;
  const updatedOrder = await orderExist.save();

  const items = updatedOrder.items;

  const flag = items.every((ele) => ele.innerStatus == "ready");
  const flag2 = items.every((ele) => ele.innerStatus == "completed");
  const flag3 = items.find((ele) => ele.innerStatus == "preparing");

  if (flag) {
    orderExist.status = "ready";
    await orderExist.save();
  }

  if (flag2) {
    orderExist.status = "completed";
    await orderExist.save();
  }
  if (flag3) {
    orderExist.status = "preparing";
    await orderExist.save();
  }

  res.status(200).json({ message: "order updated successfully" });
});
export const getAllOrders = handlerAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [orders, totalOrders] = await Promise.all([
    orderMdoel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "customer", select: "name" })
      .populate({ path: "items.product", select: "title price" })
      .populate("table")
      .skip(skip)
      .limit(limit)
      .lean(),
    orderMdoel.countDocuments(),
  ]);

  res.status(200).json({
    message: "Orders found successfully",
    data: orders,
    pagination: {
      total: totalOrders,
      page,
      limit,
      totalPages: Math.ceil(totalOrders / limit),
    },
  });
});

export const getOrderBYKitchen = handlerAsync(async (req, res, next) => {
  const { id } = req.params;

  const orders = await orderMdoel
    .find()
    .populate({
      path: "items.product",
      match: { kitchen: id },
    })
    .populate("table")
    .lean();
  const newOrder = orders.map((ele) => {
    const filterd = ele.items.filter((ele) => ele.product);

    return { ...ele, items: filterd };
  });

  const items = newOrder.map((ele) => ele.items);
  const numberofKitchens = new Set(
    items.flat().map((ele) => ele.product.kitchen.toString())
  );
  console.log(numberofKitchens);
  res
    .status(200)
    .json({ message: "order founded successfully", data: newOrder });
});
export const getorderByNumber = handlerAsync(async (req, res, next) => {});
