
$(document).ready(function () {
    //初始化物件
    $("#sortable").sortable();
    $("#sortable").disableSelection();

    buildSelectItem(".tr_black","1","color_bk");
    buildSelectItem(".tr_heart","2","color_rd");
    buildSelectItem(".tr_Diamond","3","color_rd");
    buildSelectItem(".tr_flower","4","color_bk");

    // 加上flag是為了讓文字有切換的效果
    var fontFlag = 4;

    //綁定事件
    $('#smallFont').bind('click', function () {
        if (fontFlag > 1) {
            fontFlag = fontFlag - 1;
            changeFont(fontFlag);
        }
    });

    $('#largeFont').bind('click', function () {
        if (fontFlag < 7) {
            fontFlag = fontFlag + 1;
            changeFont(fontFlag);
        }
    });

});

//綁定動態物件
$(document).on('click', '.selectArea .item', function () {
    $(this).attr('class', "click");
});

$(document).on('click', '.selectArea .click', function () {
    $(this).attr('class', "item");
});

$(document).on('click', '.selItem', function () {
    $(this).attr('class', "selClick");
});

$(document).on('dblclick', '.click', function () {
    $(this).remove();
});

//    將選取的項目新增到選取區
function addToSelect(selVal) {
    var chkType = false;
    var chkNum = false;

    var splitVal = selVal.split('_');
    var typeVal = splitVal[0];
    var numVal = splitVal[1];

//      alert("Type => " + typeVal);
//      alert("num => " + numVal);
    if (typeVal != undefined) {
        chkType = true;
    }
    if (numVal != undefined) {
        chkNum = true;
    }

//      alert(chkType);
//      alert(chkNum);

    //將選取的資料送入選取區
    if (chkType && chkNum) {
        var li = document.createElement("li");
        var typeStr = makeTypeStr(typeVal);

        li.innerHTML = "<div class='poker' >" + typeStr + "<br/>" + numVal + "</div>";
        li.setAttribute('class', "item");
        $('.selectArea').append(li);
    }

}

//將TypeVal 轉換成花色圖示
function makeTypeStr(typeVal) {
    var returnStr = '';
    if (typeVal == '1') {
        returnStr = '<a style="font-size: 30px;color: black">♠</a>';
    } else if (typeVal == '2') {
        returnStr = '<a style="font-size: 30px;color: red">♥</a>';
    } else if (typeVal == '3') {
        returnStr = '<a style="font-size: 30px;color: red">♦</a>';
    } else if (typeVal == '4') {
        returnStr = '<a style="font-size: 30px;color: black">♣</a>';
    }

    return returnStr;
}

//整理牌面，將使用過的牌清除
function sortPoker() {
    $('.selectArea li').each(function (index, element) {
        // element == this
//        alert($(element).hasClass('click'));
        if ($(element).hasClass('click')) {
            $(element).remove();
        }
    });

}

//清除牌面，將牌面清除重新開始
function clearPoker() {
    $('.selectArea li').remove();
    $('.selClick').each(function (index, element) {
        $(element).attr('class', "selItem");
    })
}

//移除選取的項目
function removeItem() {
    $(this).remove();
}

//變換字型大小/
function changeFont(fontFlag) {
    switch (fontFlag) {
        case 1:
            $('body').css('font-size', 'xx-small');
            break;
        case 2:
            $('body').css('font-size', 'x-small');
            break;
        case 3:
            $('body').css('font-size', 'small');
            break;
        case 4:
            $('body').css('font-size', 'medium');
            break;
        case 5:
            $('body').css('font-size', 'large');
            break;
        case 6:
            $('body').css('font-size', 'x-large');
            break;
        case 7:
            $('body').css('font-size', 'xx-large');
            break;
        default:
            $('body').css('font-size', 'medium');
    }
}

//生成選項
function buildSelectItem(target, color, style) {
    var itemStr = new Array("A","2","3","4","5","6","7","8","9","10","J","Q","K");
    for(var key in itemStr){
        var div = document.createElement("div");
        div.innerHTML = '<div class="selItem" onclick="addToSelect(\''+color+'_'+ itemStr[key] +'\')"><a class='+ style +'>' + itemStr[key] + '</a></div>';

        $(target).append(div);
    }
}