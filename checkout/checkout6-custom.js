$(window).on('load hashchange', () => {
  vtexjs.checkout
    .getOrderForm()
    .then(function (orderForm) {
      const clientProfileData = orderForm.clientProfileData
      clientProfileData.isCorporate = true

      return vtexjs.checkout.sendAttachment(
        'clientProfileData',
        clientProfileData
      )
    })
    .done(function (orderForm) {
      console.info('isCorporate', orderForm.clientProfileData.isCorporate)
    })
})
