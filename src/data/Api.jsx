// const main = `http://192.168.1.44:8003`
const main = `http://localhost:4956`

// const baseUrl = "http://192.168.1.44:8003/api/user-auth"
// export  {baseUrl}

const baseUrl = `${main}/api/user-auth`
export  {baseUrl}

const loginApi = `${main}/api/user-auth/login`
export  {loginApi}

const verifyPhoneOTP = `${main}/api/user-auth/verify/phone`
export  {verifyPhoneOTP}

const forgotPassword = `${main}/api/user-auth/password/forgot`
export  {forgotPassword}

const resetPassword = `${main}/api/user-auth/password/reset`
export  {resetPassword}

const getMasterCategory = `${main}/api/get/mastercat`
export  {getMasterCategory}

const getCategoryByMasterId = `${main}/api/get/mastercat/category`
export  {getCategoryByMasterId}

const getNotification = `${main}/api/graphql/count`
export  {getNotification}