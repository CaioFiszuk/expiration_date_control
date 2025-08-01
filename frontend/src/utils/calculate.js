export const calculateDays = (expirationDate) => {
    if (!expirationDate) return null;
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays;
};