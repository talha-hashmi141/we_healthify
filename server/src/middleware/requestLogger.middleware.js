const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ...(req.clinicId && { tenantId: req.clinicId }),
      ...(req.user?._id && { userId: req.user._id }),
    };
    console.log(JSON.stringify(log));
  });

  next();
};

export default requestLogger;
