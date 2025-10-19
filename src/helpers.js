//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId, UUID } from "mongodb";

//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
/**
 * check if string is only spaces
 * @param {*} str: string to process
 * @returns boolean indicating if string contains non-space chars
 */
export async function is_valid_string(str) {
    if(typeof str !== "string") {
        return false;
    }

    if(str.trim().length === 0) {
        return false;
    }

    return true;
}

/**
 * 
 * @param {*} str: stirng to process
 * returns boolean if all chars in string are a-z, A-Z, 0-9 or " "
 */
export async function only_letters_and_numbers(str) {
    if(!await is_valid_string(str)) {return false;}
    //array of all allowed characters. ASCII codes make me sad
	const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ".split("");
    for(const c of str.split("")) {
        if(!allowedChars.includes(c)) {
            return false;
        }
    }

    return true;
}

// return boolean if str consists of only letters a-z, A-Z
export async function only_letters(str) {
    if(!await is_valid_string(str)) {return false;}

    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
    for(const c of str.split("")) {
        if(!allowedChars.includes(c)) {
            return false;
        }
    }

    return true;
}

// returns boolean if name is valid
// format "[fn] [ln]", each >= 3 chars, only_letters
export async function is_valid_name(name) {
    if(!await is_valid_string(name)) {return false};

    let names = name.trim().split(" ");

    // check how many names in name. Must be two for first and last name
    if(names.length !== 2) {
        return false;
    }

    let fn = names[0];
    let ln = names[1];

    // check length of each name
    if(fn.length < 3 || ln.length < 3) {
        return false;
    }

    // check both are valid strings
    if(!await is_valid_string(fn) || !await is_valid_string(ln)) {
        return false;
    }

    // check that each name is only letters
    if(!await only_letters(fn) || !await only_letters(ln)) {
        return false;
    }

    return true;
}

// returns boolean if supplied rating is in the valid ratings
// must match exactly (case sensitive)
export async function is_valid_rating(rating) {
    if(!await is_valid_string(rating)) {return false;}
    const ratings = ["G", "PG", "PG-13", "R", "NC-17"];
    return ratings.includes(rating.trim());
}

/**
 * should be non-empty string, >= 5 chars, only letters
 */
export async function is_valid_studio(s) {
    if(!await is_valid_string(s)) {return false};

    let studio = s.trim();

    // length check
    if(studio.length < 5) {
        return false;
    }

    // check for a-z, A-Z, no numbers or special chars
    if(!await only_letters(studio)) {
        return false;
    }

    return true;
}

/**
 * if array is valid (correct type, non empty)
 */
export async function is_valid_array(arr) {
    if(typeof arr !== "object") {
        return false;
    }

    if(!Array.isArray(arr)) {
        return false;
    }

    if(arr.length < 1) {
        return false;
    }

    return true;
}

/**
 * validate genre
 * must be non-empty stirng array.
 * each element is >= 5 char, only_letters
 */
export async function is_valid_genres(genres) {
    if(!await is_valid_array(genres)) {
        return false;
    }

    for(const g of genres) {
        if(!await is_valid_string(g) || !await only_letters(g.trim())) {
            return false;
        }

        if(g.trim().length < 5) {
            return false;
        }
    }

    return true;
}

/**
 * valid castMembers
 *      is valid array with each element as valid name
 */
export async function is_valid_cast_members(cast) {
    if(!await is_valid_array(cast)) {
        return false;
    }

    for(const member of cast) {
        if(!await is_valid_string(member) || !await is_valid_name(member)) {
            return false;
        }
    }

    return true;
}

/**
 * Validate release date
 * mm/dd/yy format
 * year 1900 to current+2
 * month 1 to 12
 * day 1 to last of month
 */
export async function is_valid_date(d) {
    if(!await is_valid_string(d)) {
        return false;
    }

    let date = d.trim().split("/");

    //validate length
    if(date.length !== 3) {
        return false;
    }

    // validate all date parts are valid
    for(let i=0; i < 3; i++) {
        if(!await is_valid_string(date[i])) {
            return false;
        }

        // date string length validation
        if(i < 2) {
            if(date[i].length !== 2) {
                return false;
            }
        } else {
            if(date[i].length !== 4) {
                return false;
            }
        }
    }

    // validate all date parts are integers
    for(let i=0; i < 3; i++) {
        if(Number.isNaN(parseInt(date[i]))) {
            return false;
        }

        // if int and float parse evaluates differently, number is not int
        if(!Number.isInteger(parseFloat(date[i]))) {
            return false;
        }
    }

    // assign all parts as integers
    const month = parseInt(date[0]);
    const day = parseInt(date[1]);
    const year = parseInt(date[2]);
    const current_year = new Date().getFullYear();

    // validate year
    if(year < 1900 || year > (current_year+2)) {
        return false;
    }

    // validate month
    if(month < 1 || month > 12) {
        return false;
    }

    // validate day
    if(day < 1 || day > (new Date(year, month, 0).getDate())) {
        return false;
    }

    return true;
}

/**
 * is valid integer
 * returns boolean if string contains ONLY 0-9
 */
async function is_valid_integer(int_str) {
    if(!await is_valid_string(int_str)) {return false;}

    const allowed_chars = "0123456789";
    for(const c of int_str) {
        if(!allowed_chars.includes(c)) {
            return false;
        }
    }

    if(Number.isNaN(parseInt(int_str))) {
        return false;
    }

    if(!Number.isInteger(parseFloat(int_str))) {
        return false;
    }

    return true;
}

/**
 * validate runtime
 * format "#h #min"
 * both positive whole numbers
 *  hours 0 <= h <= inf
 *  minutes 0 <= min <= 59
 * case sensitive!
 * min time 31 minutes
 */
export async function is_valid_runtime(r) {
    if(!await is_valid_string(r)) {return false;}

    // split times into #h and #min by space. should be two elements
    let times = r.trim().split(" ");
    if(times.length !== 2) {
        return false;
    }

    // can never be too careful...
    if(r.includes(".")) {
        return false;
    }

    // parse numbers from times as strings
    let hours_str = times[0].split("h")[0];
    let min_str = times[1].split("min")[0];

    // check for extra bs in string
    if(times[0].split("h")[1]) {
        return false;
    }
    if(times[1].split("min")[1]) {
        return false;
    }

    // validate numbers
    // numebr string must be valid, must parse to number and must be integer
    if(!await is_valid_string(hours_str) || Number.isNaN(parseFloat(hours_str)) || !await is_valid_integer(hours_str)) {
        return false;
    }
    if(!await is_valid_string(min_str) || Number.isNaN(parseFloat(min_str)) || !await is_valid_integer(min_str)) {
        return false;
    }

    // safe to parse and assign numerical times
    let hours = parseInt(hours_str);
    let min = parseInt(min_str);

    // validate times
    // 0 <= minutes <= 59
    // 0 <= hours <= inf

    if(min > 59 || min < 0) {
        return false;
    }
    if(hours < 0) {
        return false;
    }

    // validate minimum time (31 minutes)
    if(hours === 0 && min < 31) {
        return false;
    }

    return true;
}

/**
 * Validate objectId
 */
export async function is_valid_object_id(id) {
    if(!await is_valid_string(id)) {
        return false;
    }

    let _id = id.trim();

    if(!ObjectId.isValid(_id)) {
        return false;
    }

    return true;
}

/**
 * is valid review rating
 * must be integer or float between 0 and 5 inclusive
 * if float, msut have maximum of 1 decimal place allowed.
 */
export async function is_valid_review_rating(r) {
    if(typeof r !== "number") {
        return false;
    }

    // number between 0 and 5 inclusive
    if(r < 0 || r > 5) {
        return false;
    }

    // if integer, ok to return at this point
    if(Number.isInteger(r)) {
        return true;
    }

    // float, compare decimals
    let decimals;
    try {
        decimals = r.toString().split(".")[1].length;
    } catch (e) {
        return false;
    }

    if(decimals > 1) {
        return false;
    }

    return true;
}

/**
 * is valid uuid
 */
export async function is_valid_uuid(uuid) {
    if(!await is_valid_string(uuid)) {
        return false;
    }

    let _u = uuid.trim();

    if(!UUID.isValid(_u)) {
        return false;
    }

    return true;
}

/**
 * return current date as mm/dd/yyyy
 */
export async function get_current_date() {
    let date = new Date(Date.now()).toLocaleString().split(",")[0].split("/");

    // make sure all have correct digits
    return [
        await pad_left(date[0], '0', 2),
        await pad_left(date[1], '0', 2),
        await pad_left(date[2], '0', 4)
    ].join("/");
}

export async function pad_left(str, char, length) {
    if(length > str.length) {
        return await mkstr(char, length - str.length) + str;
    } else {
        return str;
    }
}

export async function mkstr(char, length) {
    let str = [];
    for(let i=0; i < length; i++) {
        str.push(char);
    }

    return str.join("");
}

/**
 * Validate database response object
 */
export async function is_valid_db_res(res) {
    // the most beautiful if-then statement ever
    // essentially replicates all checks done in createMovie, but as a chained conditional
    if(
        ! await is_valid_string(res["_id"].toString()) ||        // id
        ! ObjectId.isValid(res["_id"].toString()) ||                        // id
        ! (
            await is_valid_string(res["title"]) && 
            res["title"].length > 1 && 
            await only_letters_and_numbers(res["title"])
        ) ||
        ! await is_valid_string(res["plot"]) ||                  // plot
        ! await is_valid_genres(res["genres"]) ||                // genres
        ! await is_valid_rating(res["rating"]) ||                // raitng
        ! await is_valid_studio(res["studio"]) ||                // studio
        ! await is_valid_name(res["director"]) ||                // director
        ! await is_valid_cast_members(res["castMembers"]) ||     // castMembers
        ! await is_valid_date(res["dateReleased"]) ||            // dateReleased
        ! await is_valid_runtime(res["runtime"])                 // runtime
    ) {
        return false;
    }

    return true;
}

/**
 * review validators
 */
