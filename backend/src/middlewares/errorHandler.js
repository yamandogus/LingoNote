// Hata yönetimi burada yapılacak.
const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Bir hata oluştu",
  });
};

export default errorHandler;
