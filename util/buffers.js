define([], function() {

    function arrayBufferToString(buffer, onSuccess, onFail) {
        var bufView = new Uint16Array(buffer);
        var length = bufView.length;
        var result = '';
        for (var i = 0; i < length; i += 65535) {
            var addition = 65535;
            if (i + 65535 > length) {
                addition = length - i;
            }
            result += String.fromCharCode.apply(null, bufView.subarray(i, i + addition));
        }
        if (result) {
            if (onSuccess)
                onSuccess(result);
        } else {
            if (onFail)
                onFail('buffer was invalid');
        }

        return result;

    }

    return {
        arrayBufferToString: arrayBuffertoString
    };


});
