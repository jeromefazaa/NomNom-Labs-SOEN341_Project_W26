function validatePassword(value) {
    let valid = true
    let message = "" 
       if (value.length < 8) {
           message ="Password must be at least 8 characters long.";
           valid = false;
       }
       if (!/[A-Z]/.test(value)) {
           message = "Password must contain at least one uppercase letter.";
           valid= false;
       }
       if (!/[a-z]/.test(value)) {
           message = "Password must contain at least one lowercase letter.";
           valid = false;
       }
       if (value.includes("_")) {
           message = "Password must not contain underscore (_).";
           valid = false;
       }
      return {valid, message};
    }
export {validatePassword}