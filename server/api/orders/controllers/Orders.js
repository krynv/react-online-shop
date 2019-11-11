"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */
const stripe = require("stripe")(process.env.STRIPE_SECRET);

create: async ctx => {
  const {
    address,
    amount,
    drinks,
    postalCode,
    token,
    townOrCity
  } = ctx.request.body;

  // Send charge to Stripe
  const charge = await stripe.charges.create({
    amount: amount * 100,
    currency: "gbp",
    description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
    source: token
  });

  // Create order in database
  const order = await strapi.services.orders.add({
    user: ctx.state.user._id,
    address,
    amount,
    drinks,
    postalCode,
    townOrCity
  });

  return order;
};

module.exports = {};
