const middleWareForTC=require("../middleware/asyncErrorHandling");


const stripe = require("stripe")('sk_test_51Nv1D2AtWWs18icLfK1yjkq4pQ8HU9rTFpgWWmjKY7u9jlC3IQfJ3TU8PqeMt0zN8FCWRgni9b0MEQPMff56gKh200b8ImunRB');

exports.processPayment = middleWareForTC(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "dollar",
    metadata: {
      company: "Ecommerce",
    },
    automatic_payment_methods: {
        enabled: true,
      },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

