module.exports = {
    validateUser
};

function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length <= 5) {
        errors.push('Please incldue a username with at least 5 characters');
    }

    if (!user.password || user.password.length <= 6 ) {
        errors.push('Please include a password that is atleast 6 characters long.')
    }

    return {
        isSuccessfull: errors.length > 0 ? false : true,
        errors
    };
}