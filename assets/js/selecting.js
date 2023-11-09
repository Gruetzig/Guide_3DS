/*
    Copyright (C) 2023 Gruetzig
    Copyright (C) 2023 Nintendo Homebrew

    SPDX-License-Identifier: MIT
*/

// Possible max minor for each major, major as key
const major_minor_map = {
    0: -1, // invalidate all 0.x
    1: 1,
    2: 2,
    3: 1,
    4: 5,
    5: 1,
    6: 4,
    7: 2,
    8: 1,
    9: 9,
    10: 7,
    11: 17
}

// Validate version
function validate_version(major, minor, region, model) {

    const minor_max = major_minor_map[major];
    if (!isNaN(minor_max) && minor > minor_max) {
        return false;
    }
    return true;
}

// Soundhax
// 1.0-11.3
function can_soundhax(major, minor) {
    let do_redirect = false;
    if(major <= 10) do_redirect = true;
    else if(major == 11 && minor <= 3) do_redirect = true;

    if(do_redirect) {
        window.location.href = "installing-boot9strap-(soundhax)";
        return true;
    }
    return false;
}

// Soundhax
// 11.4-11.17
function can_mset9(major, minor) {

    // Exploit supports 11.4 or later
    if(major == 11 && minor >= 4) {
        window.location.href = "installing-boot9strap-(mset9)"
        return true;
    }
    return false;
}

/*
    If <= 11.3 we do Soundhax, if >11.3 we do MSET9. Region and minor version is ignored.
*/
function redirect() {
    const major = document.getElementById("major").value;
    const minor = document.getElementById("minor").value;
    document.getElementById("result_invalidVersion").style.display = "none";

    if (!validate_version(major, minor)) {
        document.getElementById("result_invalidVersion").style.display = "block";
        return;
    }

    const redirected = [
      can_soundhax,
      can_mset9
    ].some(func => func(major, minor));
    if (redirected) return true;

    // if it actually got to this point, there is no exploit available.
    document.getElementById("result_methodUnavailable").style.display = "block";
    return false;
}
