module.exports = {
  port: process.env.PORT || 5005,
  saltRounds: 10,
  redirect: '/login',
  adsPerPage: 10,
  vapidKeys: {
    publicKey: 'BK35z7AqYNsM8GoWa-i3kie9hDuRV38LV6X0IzQqVEeE4304BXLIe8c2ywAunRDQFmJhMwfsJCil71Fpd_5VbrA',
    privateKey: 'uqNWo9uz9AffUulHM0bdJOtOMgTCsDdvAJBPc3vQ8wg',
  }
}