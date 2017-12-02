export function respond({ res, data, status, error, success }) {
  res.status(status).json({
    status,
    ...((data && { data }) || {}),
    ...((error && { error }) || {}),
    ...((success && { success }) || {}),
  });
}
