var _0x48cbb7 = _0x27e6;
(function(_0x32d6a4, _0x3257df) { var _0x125ba9 = _0x27e6,
        _0x2723c6 = _0x32d6a4(); while (!![]) { try { var _0x292f4f = parseInt(_0x125ba9(0xae)) / 0x1 + -parseInt(_0x125ba9(0xa0)) / 0x2 + parseInt(_0x125ba9(0xb6)) / 0x3 + parseInt(_0x125ba9(0xa3)) / 0x4 * (-parseInt(_0x125ba9(0xa6)) / 0x5) + -parseInt(_0x125ba9(0xa7)) / 0x6 + -parseInt(_0x125ba9(0x9f)) / 0x7 + parseInt(_0x125ba9(0x9d)) / 0x8; if (_0x292f4f === _0x3257df) break;
            else _0x2723c6['push'](_0x2723c6['shift']()); } catch (_0x76ad3d) { _0x2723c6['push'](_0x2723c6['shift']()); } } }(_0x3cdb, 0xe4708));

function _0x3cdb() { var _0x1fc701 = ['getElementById', 'querySelector', 'email', 'set', 'Error\x20writing\x20document:\x20', '14295064ibfkHz', 'doc', '4689699LeNcTw', '578748cYAZsx', 'smtp.gmail.com', 'nome', '128dxTbOG', 'collection', 'catch', '17285FJWXNE', '10613448DqMTrh', 'codigo', 'error', 'https://api.ipify.org?format=json', '.login-box', 'send', 'plataformcursos@gmail.com', '822190tgYzYv', 'joaoafb2004', '<sender’s\x20email\x20address>', 'success', 'style', 'TESTE', 'preusuarios', 'firestore', '3496434jyOEql', 'opacity', 'setItem', 'mail\x20sent\x20successfully', 'value', 'fire'];
    _0x3cdb = function() { return _0x1fc701; }; return _0x3cdb(); }
var nome = document[_0x48cbb7(0xbc)](_0x48cbb7(0xa2)),
    email = document['getElementById'](_0x48cbb7(0xbe)),
    codigo = document['getElementById'](_0x48cbb7(0xa8)),
    box = document[_0x48cbb7(0xbd)]('.login-box');
$['getJSON'](_0x48cbb7(0xaa), function(_0x1d67d9) { var _0xf6e7da = _0x48cbb7;
    localStorage[_0xf6e7da(0xb8)]('ip', _0x1d67d9['ip']); });

function _0x27e6(_0x17380e, _0x2fdac7) { var _0x3cdba3 = _0x3cdb(); return _0x27e6 = function(_0x27e6a9, _0x3842a4) { _0x27e6a9 = _0x27e6a9 - 0x9c; var _0x4ac626 = _0x3cdba3[_0x27e6a9]; return _0x4ac626; }, _0x27e6(_0x17380e, _0x2fdac7); }

function enviar() { var _0x400461 = _0x48cbb7;
    db[_0x400461(0xa4)](_0x400461(0xb4))[_0x400461(0x9e)](email[_0x400461(0xba)])[_0x400461(0xbf)]({ 'nome': nome[_0x400461(0xba)], 'email': email[_0x400461(0xba)], 'codigo': codigo[_0x400461(0xba)], 'horario': firebase[_0x400461(0xb5)]['FieldValue']['serverTimestamp'](), 'ip': localStorage['getItem']('Ip') })['then'](() => { var _0x424e46 = _0x400461;
        document[_0x424e46(0xbd)](_0x424e46(0xab))[_0x424e46(0xb2)][_0x424e46(0xb7)] = '0%', Swal[_0x424e46(0xbb)]('Pré\x20Cadastro\x20Feito\x20Com\x20Sucesso!', '', _0x424e46(0xb1)), sendEmail(); })[_0x400461(0xa5)](_0x121981 => { var _0x36c1ce = _0x400461;
        console[_0x36c1ce(0xa9)](_0x36c1ce(0x9c), _0x121981); }); }

function sendEmail() { var _0x44918f = _0x48cbb7;
    Email[_0x44918f(0xac)]({ 'Host': _0x44918f(0xa1), 'Username': _0x44918f(0xad), 'Password': _0x44918f(0xaf), 'To': email['value'], 'From': _0x44918f(0xb0), 'Subject': _0x44918f(0xad), 'Body': _0x44918f(0xb3) })['then'](console['log'](_0x44918f(0xb9))); }