//Creating repear by using promises

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}


//Creating repear By using try and catch method

// const asyncHandler = (requestHandler) = async (req, res, next) => {
//     try{
//         await requestHandler(req, res, next)
//     }
//     catch(err){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export { asyncHandler }