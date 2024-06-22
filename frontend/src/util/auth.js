
export function getTokenDuration(){
    const storedExpirationDate=localStorage.getItem('expiration');
    const expirationDate=new Date(storedExpirationDate);
    const duration=expirationDate.getTime()-Date.now();
    return duration;
}
export function tokenLoader(){
    const token=localStorage.getItem('token');
    const duration=getTokenDuration();
    if(!token || duration<0) return 'EXPIRED'
    return token;
}