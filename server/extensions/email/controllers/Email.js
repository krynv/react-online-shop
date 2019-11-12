"use strict";

module.exports = {
  send: async ctx => {
    let options = ctx.request.body;

    try {
      //Send email to the user
      await strapi.plugins["email"].services.email.send({
        to: options.to,
        from: "ex@example.com",
        subject: options.subject,
        text: options.text,
        html: options.html
      });
    } catch (err) {
      return ctx.badRequest(null, err);
    }

    ctx.send({ ok: true });
  }
};
