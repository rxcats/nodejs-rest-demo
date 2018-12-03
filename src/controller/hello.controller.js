exports.hello = async (req, res, next) => {

    return res.json(
        {
            code: 0,
            result: 'hello',
            message: 'Success',
            details: null,
        }
    );

};