"use strict";

const stripe = require("stripe")("");

module.exports = {
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
    const order = await strapi.services.orders.create({
      user: ctx.state.user._id,
      address,
      amount,
      drinks,
      postalCode,
      townOrCity
    });

    return order;
  }
};
