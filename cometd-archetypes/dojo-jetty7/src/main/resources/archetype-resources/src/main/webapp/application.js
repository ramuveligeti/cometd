dojo.require("dojox.cometd");

dojo.addOnLoad(function()
{
    var _connected = false;

    function _connectionSucceeded()
    {
        dojo.byId('body').innerHTML = 'Cometd Connection Succeeded';
    }

    function _connectionBroken()
    {
        dojo.byId('body').innerHTML = 'Cometd Connection Broken';
    }

    function _metaConnect(message)
    {
        var wasConnected = _connected;
        _connected = message.successful === true;
        if (!wasConnected && _connected)
        {
            _connectionSucceeded();
        }
        else if (wasConnected && !_connected)
        {
            _connectionBroken();
        }
    }

    var cometd = dojox.cometd;

    // Disconnect when the page unloads
    dojo.addOnUnload(function()
    {
        cometd.disconnect();
    });

    var cometURL = location.protocol + "//" + location.host + config.contextPath + "/cometd";
    cometd.configure({
        url: cometURL,
        logLevel: 'debug'
    });

    cometd.addListener('/meta/connect', _metaConnect);

    cometd.handshake();
});
