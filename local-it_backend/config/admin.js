module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f38986e59c26d8793184b3e1e6a1c2ed'),
  },
});
