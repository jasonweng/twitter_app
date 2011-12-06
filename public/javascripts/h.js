var root = "",
    st = "",
    gsid = getQuery("gsid") || 0,
    ua = navigator.userAgent.toLowerCase(),
    editime, myScroll;
(new Image()).src = "http://u1.sinaimg.cn/upload/h5/img/loading.gif";
(new Image()).src = "http://u1.sinaimg.cn/upload/h5/img/loading2.gif";
window.navigator.standalone = true;
$(document).ready(function () {
    jsource();
    if (sessionStorage.html && $(".orig").length == 0 && !getQuery("uid")) {
        $("body").html(sessionStorage.html);
        $(window).scrollTop(sessionStorage.htmltop);
        sessionStorage.html = "";
        sessionStorage.htmltop = ""
    } else {
        if ($(".dh_header")[0]) {
            $(".dh_header")[0].scrollIntoView()
        }
        Zero.Lazyload({
            range: -1
        })
    }
    $(".foot").find("a").eq(1).click(function () {
        sessionStorage.html = ""
    });
    $(".footer").find("a").click(function () {
        sessionStorage.html = ""
    });
    sessionStorage.tjht = $("#minp").val();
    st = $("body").attr("data");
    $(".adclo").click(function () {
        $(".fadx").remove();
        var l = $(this).attr("data");
        $.get(root + "iajax.php?act=closeNotice&gsid=" + gsid, {
            id: l
        })
    });
    if (window.location.href.indexOf("/mblog.php") > 0) {
        $("#minp").css({
            height: "100px"
        });
        $(".wb_fb").show()
    }
    $(".area").find("textarea").focus(function () {
        $(".area").parent().find(".wb_fb").show()
    });
    if (gsid != 0) {
        if ($(".topxz").length > 0) {
            $(".header")[0].scrollIntoView()
        }
    } else {
        if ($(".header")[0]) {
            $(".header")[0].scrollIntoView()
        }
    }
    wblbind();
    msgevt();
    $(".cont").click(function () {
        return false
    });
    initevt();
    if ($(".hot").length > 0) {
        $(".hot").find("a").each(function () {
            var m = "#" + randomColor(),
                l = parseInt(Math.random() * (30 - 12 + 1) + 12) + "px";
            $(this).css({
                color: m,
                "font-size": l
            })
        })
    }
    $(".lbs_btn").find("a:first").click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (l) {
                window.location.href = root + "searchgeo.php?longitude=" + l.coords.longitude + "&latitude=" + l.coords.latitude + "&gsid=" + gsid
            }, f)
        } else {
            alert("您的浏览器不支持地理位置信息定位！")
        }
    });

    function f(m) {
        var n = "";
        switch (m.code) {
        case m.PERMISSION_DENIED:
            n = "没有权限获取当前位置信息,请打开定位服务！";
            break;
        case m.POSITION_UNAVAILABLE:
            n = "无法获取位置信息！";
            break;
        case m.PERMISSION_DENIED_TIMEOUT:
            n = "获取位置信息超时！";
            break
        }
        if (n == "") {
            var l = m.code.toString();
            n = "The position could not be determined due to an unknown error (Code: " + l + ")."
        }
        alert(n)
    }
    $(".lbs_btn").find("a").eq(1).click(function () {
        if (this.className == "sel") {
            this.className = "";
            $(".after,.lbs_f").hide()
        } else {
            this.className = "sel";
            $(".after,.lbs_f").show()
        }
    });
    $("#returntop").click(function () {
        $(window).scrollTop(0)
    });
    if ($("#group>select").length == 0) {
        $("#group").click(function () {
            atenfz(this, "123321")
        })
    }
    $("#group>select").change(function () {
        if ($(this).val() == "fzgl") {
            window.location.href = root + "attgroup.php?cat=setting&gsid=" + gsid
        } else {
            window.location.href = root + "attgroup.php?cat=list&gid=" + $(this).val() + "&gsid=" + gsid
        }
    });
    $("#mygroup>select").change(function () {
        window.location.href = root + "attention.php?cat=0&gid=" + $(this).val() + "&gsid=" + gsid
    });
    $("#atgroup").click(function () {
        var l = this;
        if ($("#atdia").length == 0) {
            login(gsid);
            $.ajax({
                url: root + "igroupshow.php?st=" + st + "&gsid=" + gsid,
                dataType: "html",
                global: false,
                success: function (n, q) {
                    var p = $.parseJSON(n);
                    var m = "<div id='atdia' class='dia'><ul class='dia_n'>";
                    $.each(p, function (o, r) {
                        m += "<li><a href='" + root + "attention.php?cat=0&gid=" + o + "&gsid=" + gsid + "'>" + r + "</a></li>"
                    });
                    $("body").append(m);
                    dia("atdia", l)
                }
            })
        } else {
            dia("atdia", l)
        }
    });
    var b = 2;
    $("#page").click(function () {
        k(this)
    });

    function k(o) {
        if ($("#list").length == 0) {
            $(".mlist").wrapAll("<div id='list'></div>")
        }
        if (getQuery("cat")) {
            var m = getQuery("cat")
        } else {
            var m = 0
        }
        if (getQuery("gsid")) {
            var l = getQuery("gsid")
        } else {
            var l = 0
        }
        var p = $("#list").find(".mlist").last().attr("id"),
            n = $(o).parents(".bom_btn").attr("id");
        $(o).replaceWith("<a class='load' href='javascript:void(0)'></a>");
        login(l);
        $.ajax({
            url: root + "showmore.php",
            dataType: "html",
            data: "st=" + st + "&cat=" + m + "&lastid=" + p + "&gsid=" + l + "&" + n + "&page=" + b,
            success: function (s) {
                $(".load").replaceWith("<a id='page' href='javascript:void(0)'>查看更多</a>");
                var q = $(".mlist").length;
                $("#page").click(function () {
                    k(this)
                });
                $("#list").append(s);
                initevt();
                var r = $(".mlist").slice(q).get();
                Zero.Lazyload(r, {
                    range: -1
                })
            }
        });
        b++
    }
    $(".wb_fb").find(".qx").click(function () {
        $("#minp").animate({
            height: "40px"
        }, "fast");
        $("#minp").val(sessionStorage.tjht);
        $("#minp").css({
            color: "#999"
        });
        $(this).parent().hide()
    });
    $(".wb_fb").find(".qk").click(function () {
        $(".area").find("#minp").val("")
    });
    $("#minp").focus(function (l) {
        !$(".wbbg2")[0] && $(".dh2_wrap")[0] && $(".dh2_wrap")[0].scrollIntoView();
        if ($("#minp").val() == "说说新鲜事(140字以内)") {
            $("#minp").val("")
        }
        $(this).animate({
            height: "100px"
        }, "fast");
        var m = this;
        editime = setInterval(function () {
            zsxz(m, $(m).parents("form").find("span").last());
            atshow(m)
        }, 200)
    });
    $("#minp").blur(function () {
        $(this).css({
            color: "#000"
        });
        clearInterval(editime)
    });
    $("#dialogue").focus(function () {
        $(this).css({
            color: "#000"
        });
        $(this).animate({
            height: "80px"
        }, "fast");
        $(this).parents("form").find(".msg_btn").show();
        $(this).parents("form").find(".msg_btn").find("a").eq(0).click(function () {
            $(this).parent().hide();
            $("#dialogue").animate({
                height: "40px"
            }, "fast")
        });
        $(this).parents("form").find(".msg_btn").find("a").eq(1).click(function () {
            $("#dialogue").val("")
        })
    });
    $("#dialogue").keyup(function () {
        if (this.value.length > 300) {
            $("#dialogue").val($("#dialogue").val().substring(0, 299));
            var l = 0
        } else {
            var l = 300 - this.value.length
        }
        $(this).parents("form").find(".msg_btn").find("span").text("还剩" + l + "字")
    });
    $("#diamsg").focus(function () {
        $(this).css({
            color: "#000"
        });
        var l = this;
        editime = setInterval(function () {
            zsxz(l, $(".msg_btn").find("span"), 300)
        }, 300)
    });
    $("#diamsg").blur(function () {
        clearInterval(editime)
    });
    $("#intro").click(function () {
        if ($(this).height() <= 22) {
            $(this).css({
                height: "auto",
                "white-space": "normal"
            })
        } else {
            $(this).css({
                height: "22px",
                "white-space": "nowrap"
            })
        }
    });
    $(".bset").find("a").each(function () {
        $(this).click(function () {
            $(this).parent().find("a").removeClass("radio");
            $(this).addClass("radio");
            $(this).parent().find("input:hidden").val(this.id)
        })
    });
    $(".tset").find("a").click(function () {
        if (this.className == "hide") {
            this.className = "disp";
            $(this).parent().find("input:hidden").val(1)
        } else {
            this.className = "hide";
            $(this).parent().find("input:hidden").val(0)
        }
    });
    $(".screening").click(function () {
        $(this).parent().find("a").removeClass("dh2_sel lsel");
        $(this).addClass("dh2_sel lsel");
        if (this.id) {
            var q = this.id
        } else {
            var q = ""
        }
        if ($(this).attr("data") != undefined) {
            var r = "hotword.php?",
                m = "&keyword=" + $(this).attr("data")
        } else {
            if (getQuery("cat")) {
                var r = "home.php?cat=1&"
            } else {
                if (getQuery("uid")) {
                    var r = "home.php?uid=" + getQuery("uid") + "&"
                } else {
                    var r = "home.php?"
                }
            }
            var m = ""
        }
        if ($(".form").length == 0) {
            var o = "<div class='form'><form action='" + r + "st=" + st + "&gsid=" + gsid + m + "' method='post'><input type='hidden' name='act' value='advg'><input type='hidden' name='uid' value='" + q + "'><input type='hidden' name='select' value='1'>";
            if (m == "") {
                o += "<div class='frap'><span>关 键 字：</span><span><input class='filter' name='keyword' place='输入要查询的关键字' type='text'></span></div>"
            }
            o += "<div class='frap'><span>是否原创：</span><span><input name='isr' type='radio' value='0'><label>全部</label><input name='isr' type='radio' value='2'><label>原创</label><input name='isr' type='radio' value='1'><label>转发</label></span></div><div class='frap'><span>是否带图：</span><span><input name='isp' type='radio' value='0'><label>全部</label><input name='isp' type='radio' value='1'><label>有图</label><input name='isp' type='radio' value='2'><label>无图</label></span></div>";
            if (q) {
                var n = new Date(),
                    s = (n.getMonth() + 1).toString().length == 1 ? 0 + (n.getMonth() + 1).toString() : (n.getMonth() + 1).toString(),
                    l = n.getDate().toString().length == 1 ? 0 + n.getDate().toString() : n.getDate().toString(),
                    p = n.getFullYear().toString() + s + l;
                o += "<div class='frap'><input type='hidden' name='cat' value='1'><span>发布时间：</span><span class='time'><input class='filter' name='stt' type='text'> 至 <input class='filter' name='ent' value='" + p + "' type='text'></span><input type='hidden' name='cat' value='1' /></div>"
            }
            o += "<div class='frap_btn'><a id='qxbtn' href='#'>取消</a><a id='sxbtn' href='#'>筛选</a></div></form></div>";
            $(this).parent().after(o);
            $("#sxbtn").click(function () {
                $(this).parents("form").submit()
            });
            $("#qxbtn").click(function () {
                $(this).parents(".form").hide()
            })
        } else {
            $(".form").show()
        }
    });
    $("#mescreen").click(function () {
        $(this).parent().find("a").removeClass("dh2_sel lsel");
        $(this).addClass("dh2_sel lsel");
        if ($(".form").length == 0) {
            var l = "<div class='form'><form action='msg.php?st=" + st + "&gsid=" + gsid + "&cat=4' method='post'><input type='hidden' name='act' value='advg'><input type='hidden' name='select' value='1'><div class='frap'><span>按作者：</span><span><input name='isatt' type='radio' value='0'><label>所有用户</label><input name='isatt' type='radio' value='2'><label>仅关注的人</label></span></div><div class='frap'><span>按内容：</span><span><input name='isorg' type='radio' value='0'><label>所有微博 </label><input name='isorg' type='radio' value='1'><label>仅原创微博</label></span></div>";
            l += "<div class='frap_btn'><a id='qxbtn' href='#'>取消</a><a id='sxbtn' href='#'>筛选</a></div></form></div>";
            $(this).parent().after(l);
            $("#sxbtn").click(function () {
                $(this).parents("form").submit()
            });
            $("#qxbtn").click(function () {
                $(this).parents(".form").hide()
            })
        } else {
            $(".form").show()
        }
    });
    $(".gbbtn").live("click", function () {
        $(this).parent().hide()
    });
    $(".indus").click(function () {
        if ($(this).is(".sindus")) {
            $(this).removeClass("sindus");
            $(this).parent().find(".indusinfo").hide()
        } else {
            $(".indusinfo").hide();
            $(".indus").removeClass("sindus");
            $(this).addClass("sindus");
            $(this).parent().find(".indusinfo").show()
        }
    });
    resetevt();
    $(".jbr").live("click", function () {
        var o = $(this).attr("data").split("sina")[0],
            n = $(this).attr("data").split("sina")[1],
            m = $(this).attr("data").split("sina")[2];
        var l = "<div class='shie' style='display:block'><div class='box gzbox'><div class='tch'><div class='til'><a class='tipcl' href='javascript:void(0)'></a>举报不良信息</div><form class='afeng'><div class='erro jbpad'>请选择举报类别(必选)<br><input name='type' type='radio' value='2' checked/> 政治反动举报<br><input name='type' type='radio' value='3' /> 内容可能侵权<br><input name='type' type='radio' value='1' /> 内容涉及色情或暴力<br><input name='type' type='radio' value='4' /> 内容涉及其他违规事项</div><div class='topic ywjb'><div>举报用户：" + m + "</div><div class='topic_til'><div>举报原因</div></div><div><input type='hidden' name='act' value='complaint'><input type='hidden' name='id' value='" + n + "'><input type='hidden' name='uid' value='" + o + "'><textarea name='content' class='inp5 tpc' place='举报原因'></textarea></div><div class='wb_fb tfb'><a class='qx' href='javascript:void(0)'>取消</a><a class='qk' href='javascript:void(0)'>清空</a><a class='qd' href='javascript:void(0)'>提交</a></div></div></form></div></div></div>";
        removedia();
        $("body").append(l);
        setpos();
        $(".shie").find(".tfb").find("a").eq(0).click(function () {
            $(".shie").remove()
        });
        $(".shie").find(".tipcl").click(function () {
            $(".shie").remove()
        });
        $(".shie").find(".tfb").find("a").eq(1).click(function () {
            $(this).parents(".ywjb").find("textarea").val("")
        });
        $(".shie").find("textarea").focus(function () {
            $(this).css({
                color: "#000000"
            });
            $(this).animate({
                height: "100px"
            }, "fast")
        });
        $(".shie").find(".tfb").find("a").eq(2).click(function () {
            var p = datapak($(this).parents("form")),
                q = $(this).parents("form");
            login(gsid);
            $.ajax({
                url: root + "iajax.php?st=" + st + "&act=complaint&gsid=" + gsid,
                data: p,
                global: false,
                success: function (r) {
                    tipinfo(q, r, function () {
                        $(".shie").remove()
                    })
                }
            });
            return false
        })
    });
    $(".tipcl").live("click", function () {
        $(this).parents(".shie").remove()
    });
    $("#dlmm").bind("focus", function () {
        this.type = "password"
    });
    $("#dlmm").bind("blur", function () {
        if (this.value == "请输入密码") {
            this.type = "text"
        }
    });
    var d, j, h;
    document.body.addEventListener("touchstart", function (l) {
        if (!l.touches[0]) {
            return
        }
        h = l.touches[0].pageY;
        j = l.touches[0].pageX;
        d = l.timeStamp
    }, false);
    document.body.addEventListener("touchend", function (o) {
        var p = o.changedTouches[0] ? o.changedTouches[0] : o.touches[0];
        if ($(p.target).parents(".dia")[0] || $(p.target).parents(".box")[0]) {
            return
        }
        var l = Math.abs(p.pageY - h),
            n = Math.abs(p.pageX - j),
            m = o.timeStamp - d;
        if (l < 11 && n < 11 && m < 2000) {
            if ($(".fsbox,.facebox").is(":visible")) {
                $(".fsbox").remove();
                if (o.target.id != "face") {
                    $(".facebox").remove()
                }
            }
            if ($(".dia,.shie").is(":visible")) {
                $(".dia,.shie").remove()
            }
        }
    }, false);

    function g() {
        if ($(".dia").is(":visible")) {
            $(".dia").hide()
        }
    }
    if (getQuery("bkid")) {
        document.getElementById(getQuery("bkid")).scrollIntoView()
    }
    setTimeout(function () {
        $("body").find(".suc:not(:animated)").fadeOut("slow")
    }, 2000);
    initinp();
    if (!getQuery("client")) {
        showlatste();
        if (getCookie("gsid_CTandWM") || getQuery("gsid")) {
            setInterval(function () {
                showlatste()
            }, 60000)
        }
    }
    $(".orig").unbind("click");
    $(".plimg").live("click", function () {
        if ($("#sendsqu").length > 0) {
            return
        }
        var q = "sendsqu",
            n = $(".sju").find("a").attr("data"),
            m = "<div id='" + q + "' class='topic' style='margin-bottom:5px'><form><div><textarea name='content' class='inp5 tpc'>#" + n + "#</textarea></div></form><div class='wb_fb tfb'><a id='tjqx' class='qx' href='javascript:void(0)'>取消</a><a id='tjqk' class='qk' href='javascript:void(0)'>清空</a><a id='tjqd' class='qd' href='javascript:void(0)'>发布</a><span>还剩140字</span></div></div>",
            p = $(".sju"),
            l = p.html();
        p.html(m);
        p.find("textarea").blur(function () {
            clearInterval(editime)
        });
        p.find("textarea").focus(function () {
            $(this).css({
                color: "#000000"
            });
            $(this).animate({
                height: "80px"
            }, "fast");
            var o = this;
            editime = setInterval(function () {
                zsxz(o, $(o).parents(".topic").find(".wb_fb").find("span"), 140)
            }, 300)
        });
        p.find("#tjqx").click(function () {
            p.html(l)
        });
        p.find("#tjqk").click(function () {
            p.find("textarea").val(" ")
        });
        p.find("#tjqd").click(function () {
            if (p.find("textarea").val() == "") {
                return
            }
            var o = datapak($(this).parents(".topic").find("form"));
            login(gsid);
            $.ajax({
                url: root + "iajax.php?st=" + st + "&tag=" + n + "&act=addmblog&gsid=" + gsid,
                data: o,
                global: false,
                success: function (s) {
                    var r = $.parseJSON(s);
                    p.html(" ");
                    tipinfo(p, r.msg, function () {
                        p.html(l)
                    })
                }
            })
        })
    });
    var c;
    if ($(".wb_qy").length > 0) {
        c = setInterval(function () {
            a()
        }, 5000);
        $(window).scroll(function () {
            var l = $(window).scrollTop(),
                m = $(".wb_qy").height() + $(".wb_qy").offset().top;
            if (l > m && c) {
                clearInterval(c)
            } else {
                clearInterval(c);
                if (window.location.hash != "#2") {
                    c = setInterval(function () {
                        a()
                    }, 5000)
                }
            }
        })
    } else {
        if (c) {
            clearInterval(c)
        }
    }
    function a() {
        var m = $(".wb_qy").find("dl:visible"),
            l = m.next().eq(0);
        if (l.length <= 0) {
            l = $(".wb_qy").find("dl:first")
        }
        m.fadeOut("slow", function () {
            l.fadeIn("slow")
        })
    }
    if (typeof (tagList) != undefined) {
        $(".mk").click(function () {
            $(".mk").removeClass("cad");
            $(this).addClass("cad");
            $(".showl").remove();
            var m = "",
                l = $(this).text();
            $.each(tagList[l], function (r, s) {
                m += "<a href='v2star.php?cat=1&tag=" + l + "&subcat=" + r + "&sorttype=industry&lcat=1&gsid=" + gsid + "'>" + s + "</a>"
            });
            var o = "<dl class='showl'><dt><img class='fkm' src='http://u1.sinaimg.cn/upload/h5/img/blank.gif'/></dt><dd>" + m + "</dd></dl>";
            var q = Math.floor($(".markqy").width() / ($(".mk").width() + 12)),
                n = Math.ceil(($(".mk").index($(this)) + 1) / q),
                p;
            if ($(".mk").length > (n * q)) {
                p = (n * q) - 1
            } else {
                p = $(".mk").length - 1
            }
            $(".mk").eq(p).after(o);
            $(".fkm").css({
                "margin-left": $(this).position().left + 15
            });
            $(".showl").slideDown()
        })
    }
    $(".sx").click(function () {
        $(this).parent().find("a").removeClass("lsel");
        $(this).addClass("lsel");
        var q = "",
            l = $("#industry").val(),
            p = $("#ficat").val();
        if ($(this).text() == "地区") {
            var r = P,
                n = "pid",
                o = "area"
        } else {
            var r = L,
                n = "letter",
                o = "letter"
        }
        $.each(r, function (t, u) {
            if ($("#industry").length > 0) {
                var s = "v2star.php?cat=1&tag=" + l + "&subcat=" + p + "&sorttype=industry&sortby=" + o + "&" + n + "=" + t + "&lcat=1&gsid=" + gsid
            } else {
                if (n == "pid") {
                    var s = "v2star.php?cat=1&sorttype=letter&pid=" + t + "&sortby=area&letter=" + $("#letter").val() + "&lcat=1&gsid=" + gsid
                } else {
                    var s = "v2star.php?cat=1&sorttype=area&pid=" + $("#area").val() + "&sortby=letter&letter=" + t + "&lcat=1&gsid=" + gsid
                }
            }
            q += "<a href='" + s + "'>" + u + "</a>"
        });
        if ($(".submu").length == 0) {
            var m = "<div class='submu mrta'>" + q + "</div>";
            $(".wblist:first").before(m)
        } else {
            $(".submu").html(q)
        }
    });
    $("#xlist").html();
    $("#face").live("click", function () {
        bindface(this)
    })
});

function mrt(f, a, h) {
    $("#industry").html("<option value='0'>行业</option><option value='1'>地区</option><option value='2'>首字母</option>");
    $("#ficat").html("<option value='0'>请选择</option>");
    $("#xlist").html("<option value='0'>请选择</option>");
    var d = "";
    $.each(tagList, function (j, k) {
        d += "<option value='" + j + "'>" + j + "</option>"
    });
    $("#industry").append(d);
    if (f) {
        $("#industry").val(f)
    }
    if (a) {
        c(f);
        $("#ficat").val(a)
    }
    $("#industry").change(function () {
        if ($(this).val() == 0) {
            window.location.href = root + "v2star.php?cat=1&sorttype=industry&gsid=" + gsid;
            return
        }
        if ($(this).val() == 1) {
            window.location.href = root + "v2star.php?cat=1&sorttype=area&gsid=" + gsid;
            return
        }
        if ($(this).val() == 2) {
            window.location.href = root + "v2star.php?cat=1&sorttype=letter&gsid=" + gsid;
            return
        }
        c($(this).val())
    });
    $("#ficat").change(function () {
        if ($(this).val() == 0) {
            return
        }
        var j = $("#industry").val();
        window.location.href = root + "v2star.php?cat=1&tag=" + j + "&subcat=" + $(this).val() + "&sorttype=industry&lcat=1&gsid=" + gsid
    });
    var b = "";
    if ($("#xlist").attr("data") == "area") {
        var g = P
    } else {
        var g = L
    }
    $.each(g, function (j, k) {
        b += "<option value='" + j + "'>" + k + "</option>"
    });
    $("#xlist").html("<option value='0'>请选择</option>");
    $("#xlist").append(b);
    if (h) {
        $("#xlist").val(h)
    }
    $("#xlist").change(function () {
        var j = $("#industry").val(),
            k = $(this).val(),
            n = $("#ficat").val();
        if ($("#xlist").attr("data") == "area") {
            var l = "pid",
                m = "area"
        } else {
            var l = "letter",
                m = "letter"
        }
        window.location.href = root + "v2star.php?cat=1&tag=" + j + "&subcat=" + n + "&sorttype=industry&sortby=" + m + "&" + l + "=" + k + "&lcat=1&gsid=" + gsid
    });

    function c(k) {
        var j = "";
        $.each(tagList[k], function (l, m) {
            j += "<option value='" + l + "'>" + m + "</option>"
        });
        $("#ficat").html("<option value='0'>请选择</option>");
        $("#ficat").append(j)
    }
}
function lettera(c, d, b) {
    $("#letter").html("<option value='0'>请选择</option>");
    $("#area").html("<option value='0'>请选择</option>");
    $("#sorttype").html("<option value='hy'>行业</option><option value='area'>地区</option><option value='letter'>首字母</option>");
    (typeof (L) != "undefined") && a(L, $("#letter"));
    (typeof (P) != "undefined") && a(P, $("#area"));
    if (c != "") {
        $("#letter").val(c)
    }
    if (d != "") {
        $("#area").val(d)
    }
    $("#sorttype").val(getQuery("sorttype"));
    $("#letter").change(function () {
        if ($(".mrt").find("select").index($(this)) == 1) {
            window.location.href = root + "v2star.php?cat=1&sorttype=letter&letter=" + $(this).val() + "&lcat=1&gsid=" + gsid
        } else {
            window.location.href = root + "v2star.php?cat=1&sorttype=area&pid=" + $("#area").val() + "&sortby=letter&letter=" + $(this).val() + "&lcat=1&gsid=" + gsid
        }
    });
    $("#area").change(function () {
        if ($(".mrt").find("select").index($(this)) == 1) {
            window.location.href = root + "v2star.php?cat=1&sorttype=area&pid=" + $(this).val() + "&lcat=1&gsid=" + gsid
        } else {
            window.location.href = root + "v2star.php?cat=1&sorttype=letter&pid=" + $(this).val() + "&sortby=area&letter=" + $("#letter").val() + "&lcat=1&gsid=" + gsid
        }
    });
    $("#sorttype").change(function () {
        if ($(this).val() == "hy") {
            window.location.href = root + "v2star.php?cat=1&sorttype=industry&gsid=" + gsid;
            return
        }
        if ($(this).val() == "area") {
            window.location.href = root + "v2star.php?cat=1&sorttype=area&gsid=" + gsid;
            return
        }
        if ($(this).val() == "letter") {
            window.location.href = root + "v2star.php?cat=1&sorttype=letter&gsid=" + gsid;
            return
        }
    });

    function a(g, h) {
        var f = "";
        $.each(g, function (j, k) {
            f += "<option value='" + j + "'>" + k + "</option>"
        });
        h.html("<option value='0'>请选择</option>");
        h.append(f)
    }
}
var hc;

function atshow(f) {
    if (ua.indexOf("android") > 0) {
        return;
        $(f).keyup(function (l) {
            if (this.id == "") {
                this.id = "atmark"
            }
            var k = this.id;
            if (l.keyCode == 0) {
                window.open("android/atlist.php?sid=" + k + "&start=" + f.selectionStart + "&gsid=" + gsid, "列表", "width=150,height=200");
                return
            }
        });
        return
    }
    var j = $(f).val();
    if (j.substring(((f.selectionStart - 21) < 0 ? 0 : f.selectionStart - 21), f.selectionStart).indexOf("@") != -1) {
        var d = j.substring(0, f.selectionStart).split("@").length,
            h = d == 1 ? " " : j.substring(0, f.selectionStart).split("@").pop();
        if (h.indexOf(" ") != -1) {
            $("#atname").hide();
            return
        } else {
            if (h.length > 20 || h == " " || h == undefined) {
                return
            } else {
                if (h == hc) {
                    return
                }
            }
        }
        var c = Math.floor($(f).width() / 14),
            g = Math.ceil(f.selectionStart / c),
            b = (f.selectionStart - (g - 1) * c) * 14 - 14,
            a = g * 14;
        if (h != "") {
            login(gsid);
            $.ajax({
                url: root + "iajax.php?act=atonce&id=" + h + "&st=" + st + "&gsid=" + gsid,
                global: false,
                success: function (m) {
                    if (m == 0) {
                        return
                    }
                    var n = m.split(",");
                    var k = "<div id='atname' class='dia'><ul class='dia_n'><li>想用@提到谁？</li>";
                    for (var l = 0; l < n.length; l++) {
                        k += "<li><a class='abtn' href='javascript:void(0)'>" + n[l] + "</a></li>"
                    }
                    k += "</ul></div>";
                    if ($("#atname").length != 0) {
                        $("#atname").remove()
                    }
                    $("body").append(k);
                    dia("atname", f, b, a);
                    $("#atname").find(".abtn").click(function () {
                        var o = f.value.substring(0, f.selectionStart).split("@"),
                            p = f.value.substring(f.selectionStart, f.value.length);
                        o.pop();
                        o.push($(this).text());
                        f.value = o.join("@") + " " + p;
                        $("#atname").hide();
                        if (f) {
                            f.scrollIntoView()
                        }
                    })
                }
            })
        }
        hc = h
    } else {
        $("#atname").hide()
    }
}
function wblbind() {
    $(".wblist").unbind("click");
    $(".wblist").bind("click", function () {
        if (!$(this).is(".focus")) {
            $(".wblist").removeClass("focus");
            $(".wb_pl").hide();
            if ($(".topic").attr("id") != "sendsqu") {
                $(".topic").hide()
            }
            $(".tybtn").hide();
            $(".tybtn2").hide();
            $(".cont").hide();
            $(".bq").css({
                height: "22px",
                "white-space": "nowrap"
            });
            $(this).addClass("focus");
            $(this).find(".wb_pl").show();
            $(this).find(".tybtn").show();
            $(this).find(".tybtn2").show();
            $(this).find(".cont").show();
            $(this).find(".bq").css({
                height: "auto",
                "white-space": "normal"
            });
            if ($(".dh2_sel").text() == "名人堂") {
                var a = $(this),
                    b = $(this).attr("id");
                if (a.find(".cation").length == 0) {
                    $.ajax({
                        url: root + "iajax.php?act=viptitle&id=" + b + "&gsid=" + gsid,
                        global: false,
                        success: function (d) {
                            var c = "<div class='cation'>" + d + "</div>";
                            a.find(".qy").after(c)
                        }
                    })
                } else {
                    a.find(".cation").show()
                }
            }
        } else {
            if ($(this).find(".wb_pl").is(":visible") || $(this).find(".plist").is(":visible")) {
                $(this).find(".wb_pl").hide();
                $(this).find(".plist").remove();
                if ($(this).find(".wbom").find("img")[0]) {
                    $(this).find(".wbom").find("img")[0].className = "uplist"
                }
                $(this).find(".topic").hide()
            } else {
                $(this).find(".wb_pl").show();
                $(this).find(".topic").each(function () {
                    if ($(this).is(":visible")) {
                        $(this).parent().find(".wb_pl").hide()
                    }
                })
            }
            if ($(this).find(".cont").is(":visible")) {
                $(this).find(".cont").hide()
            } else {
                $(this).find(".cont").show();
                $(this).find(".topic").each(function () {
                    if ($(this).is(":visible")) {
                        $(this).parent().find(".cont").hide()
                    }
                })
            }
            if ($(this).find("div[class^='tybtn']").is(":visible")) {
                $(this).find("div[class^='tybtn']").hide()
            } else {
                $(this).find("div[class^='tybtn']").show();
                $(this).find(".topic").each(function () {
                    if ($(this).is(":visible")) {
                        $(this).parent().find("div[class^='tybtn']").hide()
                    }
                })
            }
        }
    })
}
function msgevt() {
    $(".msglist").unbind("click");
    $(".msglist").click(function () {
        if (!$(this).is(".xzct")) {
            $(".msglist").removeClass("xzct");
            $(".msgbtn").hide();
            $(this).find(".msgbtn").show();
            $(this).addClass("xzct")
        } else {
            if ($(this).find(".msgbtn").is(":visible")) {
                $(this).find(".msgbtn").hide()
            } else {
                $(this).find(".msgbtn").show()
            }
        }
    });
    $(".msgbtn").click(function (a) {
        a.stopPropagation()
    })
}
function initevt() {
    $(".wb_pl").each(function () {
        var y = $(this).parents(".wblist").attr("id");
        $(this).find("#pl").click(function (z) {
            topic(this, 1);
            z.stopPropagation()
        });
        $(this).find("#zf").click(function (z) {
            topic(this, 0)
        });
        $(this).find("#reply").click(function () {
            var A = $(this).parents(".wblist").find(".wbtil").find("a").text(),
                D = this,
                C = $(D).parents(".wblist").attr("id").split("sina")[0],
                z = $(D).parents(".wblist").attr("id").split("sina")[1];
            if ($(D).parents(".wblist").find("#rep").length == 0) {
                var B = "<div id='rep' class='topic'><div class='topic_til'><span>还剩140字</span></div><form><div><input type='hidden' name='act' value='addReply'><input type='hidden' name='srcid' value='" + C + "'><input type='hidden' name='cmtid' value='" + z + "'><textarea name='content' class='inp5 tpc'></textarea><div class='checkb'><div class='tszf'><div class='tszf'><input id='" + z + "5' type='checkbox' name='rt'><label for='" + z + "5'>同时转发到我的微博</lable></div></div></div></form><div class='wb_fb tfb'><a class='qx' href='javascript:void(0)'>取消</a><a class='qk' href='javascript:void(0)'>清空</a><img id='face' src='http://u1.sinaimg.cn/upload/h5/img/face_icon.png'><a class='qd' href='javascript:void(0)'>回复</a></div></div>";
                $(this).parents(".wbr").append(B);
                $(this).parents(".wbr").find("#rep").find("textarea").blur(function () {
                    clearInterval(editime)
                });
                $(D).parents(".wbr").find("#rep").find("textarea").focus(function () {
                    $(this).css({
                        color: "#000000"
                    });
                    $(this).animate({
                        height: "100px"
                    }, "fast");
                    var F = this;
                    editime = setInterval(function () {
                        zsxz(F, $(F).parents(".topic").find(".topic_til").find("span"))
                    }, 300)
                });
                $(D).parents(".wbr").find("#rep").show();
                $(D).parents(".wbr").find("#rep").find(".tfb").find("a").eq(0).click(function () {
                    $(this).parents(".wbr").find(".wb_pl").show();
                    $(this).parents(".wbr").find("#rep").find("textarea").css({
                        height: "28px"
                    });
                    $(this).parents(".wbr").find("#rep").find("textarea").val("");
                    $(this).parents(".wbr").find("#rep").hide()
                });
                $(D).parents(".wbr").find("#rep").find(".tfb").find("a").eq(1).click(function () {
                    $(this.parentNode.parentNode).find("textarea").val("")
                });
                $(D).parents(".wbr").find("#rep").find(".tfb").find("a").eq(2).click(function () {
                    if ($(this).parents(".wbr").find("#rep").find("textarea").val() == "") {
                        return
                    }
                    var F = datapak($(this).parents("#rep").find("form")),
                        G = $(this).parents(".wbr");
                    $(this).parents(".topic").hide();
                    login(gsid);
                    $.ajax({
                        url: root + "commentDeal.php?st=" + st + "&gsid=" + gsid,
                        data: F,
                        global: false,
                        success: function (H) {
                            tipinfo(G, H, function () {
                                G.find(".wb_pl").show()
                            })
                        }
                    });
                    return false
                })
            } else {
                $(D).parents(".wblist").find("#rep").show()
            }
            $(D).parent().hide();
            return false
        })
    });
    $(".wbom").find("#androidMore").find("select").change(function () {
        v(this)
    });

    function v(D) {
        var G = $(D).val();
        var A = $(D).parents(".mlist").attr("id");
        var z = (A.indexOf("sinaat") != -1);
        var B = A;
        if (B.indexOf("fav") != -1) {
            B = B.split("sinafav")[0]
        }
        if (B.indexOf("at") != -1) {
            B = B.split("sinaat")[0]
        }
        var F = A.split("sina");
        var H = F[0];
        var I = F[1];
        var y = $(D).parents(".wbr").attr("id");
        switch (G) {
        case "addfave":
            addfave(event, this, I);
            break;
        case "delwb":
            if (z) {
                delwb(I, "delat")
            } else {
                delwb(I, "delwb")
            }
            break;
        case "atother":
            atother(A, y);
            break;
        case "jb":
            x(B + "sina" + y);
            break;
        case "delfave":
            delwb(I, "delfav", this, "qxsc");
            break
        }
        var J = navigator.appVersion;
        var K = ($.trim(J).split(";")[2]).toLowerCase();
        var C = (K.indexOf("iphone") != -1);
        if (C) {
            $(D).get(0).selectedIndex = 0
        }
    }
    j(0, $(".page").attr("maxPage"));

    function j(A, z) {
        var y = [];
        if (A >= (z - 1)) {
            A = (z - 1)
        }
        if (A < 0) {
            A = 0
        }
        for (var B = 0; B < z; B++) {
            if (B == A) {
                y.push("<option value='" + (B + 1) + "' selected>第" + (B + 1) + "页</option>");
                $("#pageValue").html("第" + (B + 1) + "页")
            } else {
                y.push("<option value='" + (B + 1) + "'>第" + (B + 1) + "页</option>")
            }
        }
        $("#pageSel").html(y.join(""))
    }
    g($(".page").attr("maxPage"));

    function g(z) {
        var C = $("#pageSel").val();
        var y = $("#prePage");
        var A = $("#nextPage");
        var B = ($(".page").attr("position") != undefined);
        if (C == "1") {
            y.unbind("click");
            y.removeClass("btnEn");
            y.addClass("btnUn")
        } else {
            y.unbind("click").removeAttr("onclick").bind("click", o);
            y.removeClass("btnUn");
            y.addClass("btnEn")
        }
        if (C == z) {
            A.unbind("click");
            A.removeClass("btnEn");
            A.addClass("btnUn")
        } else {
            A.unbind("click").removeAttr("onclick").bind("click", s);
            A.removeClass("btnUn");
            A.addClass("btnEn")
        }
    }
    $("#pageSel").live("change", function () {
        var z = $(this).val();
        var y = 0;
        $(".mlist:first")[0] && (y = $(".mlist:first").offset().top);
        $(".wblist:first")[0] && (y = $(".wblist:first").offset().top);
        $(".msglist:first")[0] && (y = $(".msglist:first").offset().top);
        $(".plist:first")[0] && (y = $(".plist:first").offset().top);
        window.scrollTo(0, y);
        d(z)
    });

    function o() {
        var z = $("#pageSel").val();
        var y = parseInt(z) - 1;
        if (y < 1) {
            y = 1;
            return
        }
        d(y)
    }
    function s() {
        var A = $("#pageSel").val();
        var y = parseInt(A) + 1;
        var z = parseInt($(".page").attr("maxpage"));
        if (y > z) {
            y = z;
            return
        }
        d(y)
    }
    function f(D, z) {
        if (!z) {
            var y = "<div class='fave pf'>" + D + "</div>";
            $("body").append(y);
            var C = document.documentElement.scrollTop || window.pageYOffset;
            var B = C + $(window).height() / 2 - $(".fave").height() / 2,
                A = $(window).width() / 2 - $(".fave").width() / 2;
            $(".fave").css({
                top: B,
                left: A
            })
        } else {
            $(".fave").fadeOut().remove()
        }
    }
    function w() {
        var A = changestr($(".page").attr("pageurl"));
        var B = getQuery("uid");
        var y = $("#loginuid").attr("data");
        var z = ((B != false) && (B == y) && (!getQuery("cat")));
        if (A.indexOf(".php?") == -1) {
            if (z) {
                A += "?cat=1&"
            } else {
                A += "?"
            }
        } else {
            if (z) {
                A += "&cat=1"
            } else {
                A += "&"
            }
        }
        return A
    }
    function n() {
        var z = $("#turnPagePos").offset().top;
        var y = $(window).scrollTop();
        if (y > 0) {
            window.scrollTo(0, z)
        }
    }
    function p() {
        var A = navigator.appVersion;
        var y = ($.trim(A).split(";")[2]).toLowerCase();
        var z = (y.indexOf("iphone") != -1);
        if (z) {
            return true
        } else {
            return false
        }
    }
    function d(D) {
        var B = "";
        var z = w($(".page").attr("pageurl"));
        var y = z + "page=" + D + "&json=1&gsid=" + gsid;
        var C = $(".page").attr("position");
        $(".mlist:first")[0] && $(".mlist:first")[0].scrollIntoView();
        $(".wblist:first")[0] && $(".wblist:first")[0].scrollIntoView();
        $(".msglist:first")[0] && $(".msglist:first")[0].scrollIntoView();
        $(".plist:first")[0] && $(".plist:first")[0].scrollIntoView();
        if (C == undefined) {
            var A = (ua.indexOf("iphone") != -1);
            if (A) {
                B = "<div class='pageload'><img class='loadimg' src='http://u1.sinaimg.cn/upload/h5/img/loading.gif'/></div>"
            } else {
                B = "<div class='pageload'>正在加载...</div>"
            }
            $("#list").html(B)
        } else {
            setTimeout(function () {
                f("正在加载...")
            }, 200)
        }
        $.ajax({
            url: y,
            dataType: "json",
            global: false,
            success: function (I) {
                var G = I.msg;
                if (G != undefined) {
                    $(".mlist") && $(".mlist").wrapAll("<div class='mlist'><div class='ggd'></div></div>");
                    $(".wblist") && $(".wblist").wrapAll("<div class='mlist'><div class='ggd'></div></div>");
                    $(".msglist") && $(".msglist").wrapAll("<div class='mlist'><div class='ggd'></div></div>");
                    $(".plist") && $(".plist").wrapAll("<div class='mlist'><div class='ggd'></div></div>");
                    $(".ggd").html(G);
                    $("#pageSel").get(0).selectedIndex = parseInt(D) - 1;
                    $("#pageValue").html("第" + D + "页");
                    var H = $(".page").attr("maxPage");
                    g(H + "");
                    f("", 1);
                    return
                }
                var M = I.json;
                var J = parseInt(I.maxPage + "");
                j((parseInt(D + "") - 1), J);
                g(J + "");
                if (C == undefined || (C == "myAtMsg") || (C == "otherAtMsg")) {
                    var F = I.newPageUrl;
                    if (F != undefined) {
                        $(".page").attr("pageurl", changestr(F))
                    }
                    t(C, M)
                } else {
                    switch (C) {
                    case "msgGroup":
                        a(M);
                        break;
                    case "msgChat":
                        var O = I.my;
                        var N = I.other;
                        u(O, N, M);
                        break;
                    case "commentSend":
                        r(M);
                        break;
                    case "commentReceive":
                        q(M);
                        break;
                    case "myatt":
                    case "myfans":
                    case "otheratt":
                    case "otherfans":
                    case "searchUser":
                    case "star":
                        l(C, M);
                        break;
                    case "huati0":
                    case "huati1":
                        c(C, M);
                        break;
                    case "attgroupUserlist":
                        var K = I.gid;
                        k(K, M);
                        break;
                    case "commentlist":
                        b(M);
                        break;
                    case "myAtCmt":
                        h(M);
                        break
                    }
                }
                if (C != undefined) {
                    f("", 1)
                }
            }
        })
    }
    function h(A) {
        var y = $.trim($("#loginuid").attr("data"));
        var B = $("#opentx").attr("data") == 1 ? true : false;
        login(gsid);
        var z = "";
        if (A != null) {
            $(".wblist").wrapAll("<div id='atcmtlist'></div>");
            $.each(A, function (W, Q) {
                var N = Q.id;
                var G = Q.mblogid;
                var I = Q.time;
                var R = Q.content;
                var K = Q.reply;
                var F = Q.srctext;
                var C = Q.showMoreSrc;
                var X = Q.user;
                var J = X.id;
                var D = X.nick;
                var M = X.gender;
                var T = X.avatar;
                var O = X.vip;
                var V = Q.srcuser;
                var H = V.id;
                var U = V.nick;
                var S = V.vip;
                z += "<div id='" + W + "' class='wblist'>";
                if (B) {
                    z += "<div class='wbl'><a class='pl' href='home.php?uid=" + J + "&gsid=" + gsid + "'><img class='por' src='" + T + "' alt='头像'/></a></div>";
                    z += "<div class='wbr'>"
                } else {
                    z += "<div class='wbr wtx'>"
                }
                z += "<div class='wbtil'><a class='pl' href='home.php?uid=" + J + "&gsid=" + gsid + "'></a>";
                z += "<div><a class='nk' href='home.php?uid=" + J + "&gsid=" + gsid + "'>" + D + "</a>";
                if (O != 0) {
                    z += "<img src='" + O + "' alt='V'/>"
                }
                z += "</div><span class='vip'>" + I + "</span></div><p>" + R + "</p>";
                z += "<dl class='tip'><dt></dt><dd><a href='home.php?uid=" + H + "&gsid=" + gsid + "'>" + U + "</a>";
                if (S != 0) {
                    z += "<img src='" + S + "' alt='V'/>"
                }
                z += "：&nbsp;<span><a href='comment.php?srcid=" + G + "&rl=1&gsid=" + gsid + "'>" + F + "</a></span></dd></dl>";
                z += "<div id='topic' class='wb_fb wb_pl'><a id='hf' href='javascript:void(0)'>回复" + M + "</a></div></div></div></div>"
            });
            $("#atcmtlist").html(z);
            $(".wblist")[0].scrollIntoView();
            wblbind();
            resetevt()
        }
    }
    function b(A) {
        var y = $.trim($("#loginuid").attr("data"));
        login(gsid);
        var z = "";
        if (A != null) {
            $.each(A, function (Q, O) {
                var N = O.uid;
                var C = O.srcuid;
                var M = O.srctype;
                var H = O.time;
                var T = O.content;
                var F = O.cmtsource;
                var B = O.nick;
                var S = O.srcnick;
                var J = O.img;
                var G = O.vip;
                var D = ($(".wblist:eq(0)").attr("id")).split("sina")[0];
                var I = ($(".wblist:eq(0)").attr("id")).split("sina")[1];
                var K = I + "sina" + Q + "sina" + N;
                var R = (N == y);
                z += "<div id='" + Q + "' class='plinfo'>";
                if (J != "0") {
                    z += "<div class='wbl'> <a class='pl' href='home.php?uid=" + N + "&gsid=" + gsid + "'><img class='por' alt='头像' src='" + J + "'></a></div><div class='wbr'>"
                } else {
                    z += "<div class='wbr wtx'>"
                }
                z += "<div class='plct'><a class='nk' href='home.php?uid=" + N + "&gsid=" + gsid + "'>";
                if (R) {
                    z += "我&nbsp;"
                } else {
                    z += B + "&nbsp;"
                }
                z += "</a>";
                if (!R) {
                    if (G != "0") {
                        z += "<img alt='V' src='" + G + "'>"
                    }
                }
                if (M == "1") {
                    z += "&nbsp;回复&nbsp;<a class='nk' href='home.php?uid=" + C + "&gsid=" + gsid + "'>" + S + "</a>";
                    if (!R) {
                        if (G != "0") {
                            z += "<img alt='V' src='" + G + "'>"
                        }
                    }
                }
                z += "&nbsp;:&nbsp;" + T + "</div><div class='hfbtn'><span>" + H + "&nbsp;来自" + F + "</span><div>";
                if ((D == y) || (R)) {
                    z += "<a class='del' onclick='delwb(\"" + K + "\",\"delmyc\")' href='javascript:void(0)'>删除</a>&nbsp;|&nbsp;"
                }
                z += "<a href='javascript:void(0)' onclick='listhf(event,this,\"" + I + '","' + Q + "\")'>回复</a></div></div></div></div>"
            });
            $(".plist").html(z)
        }
    }
    function k(z, A) {
        login(gsid);
        var y = "";
        if (A != null) {
            $(".wblist").wrapAll("<div id='userlist'></div>");
            $.each(A, function (D, F) {
                var C = D;
                var G = z + "sina" + C;
                var B = F.nick;
                var H = F.vip;
                y += "<div id='" + G + "' class='wblist'><a class='nk' href='home.php?uid=" + C + "&gsid=" + gsid + "'>" + B + "</a>";
                if (H != "0") {
                    y += "<img alt='V' src='" + H + "'>"
                }
                y += "<a class='cancel' onclick='delwb(\"" + G + "\",\"delattgpu\")' href='javascript:void(0)'>移除</a></div>"
            });
            $("#userlist").html(y)
        }
    }
    function c(A, z) {
        login(gsid);
        var y = "";
        if (z != null) {
            $(".wblist").wrapAll("<div id='tplist'></div>");
            $.each(z, function (D, F) {
                var C = F.trend;
                var G = F.keyword;
                var B = encodeURI(G);
                y += "<div id='" + G + "' class='wblist'>";
                if (A == "huati0") {
                    y += "<img class='" + C + "' src='http://u1.sinaimg.cn/upload/h5/img/blank.gif'>";
                    y += "<a class='k' href='hotword.php?keyword=" + B + "&gsid=" + gsid + "'>" + G + "</a>"
                }
                if (A == "huati1") {
                    y += "<a class='jgz' href='hotword.php?keyword=" + B + "&gsid=" + gsid + "'>" + G + "</a>";
                    y += "<a class='cancel' onclick='delwb(\"" + G + "\",\"delcfav\")' href='javascript:void(0)'>取消</a>"
                }
                y += "</div>"
            });
            $("#tplist").html(y)
        }
    }
    function l(B, A) {
        var y = ($("#loginuid").attr("data")).trim();
        login(gsid);
        $(".wblist").wrapAll("<div id='plist'></div>");
        var z = "";
        if (A != null) {
            $.each(A, function (T, S) {
                var N = S.uid;
                var D = S.nick;
                var R = S.gender;
                var K = "他";
                if (R == "1") {
                    var K = "她"
                }
                var I = S.vip;
                if (I == 2) {
                    I = "http://u1.sinaimg.cn/upload/v_blue2.gif"
                } else {
                    if (I == 1) {
                        I = "http://u1.sinaimg.cn/upload/v_orange2.gif"
                    }
                }
                var M = S.img;
                var V = S.attmenum;
                var H = S.time;
                var J = S.isfans;
                var C = S.atted;
                var G = S.area;
                var Q = (N == y);
                var U = "<a href='javascript:void(0)' onclick='gztip(event,this,\"" + N + "\")'>+关注</a>";
                var F = "<a class='cancel' onclick='delwb(\"" + N + "\",\"delc\")' href='javascript:void(0)'>取消关注</a>";
                var O = "<a onclick='sendmsg(event,\"" + N + '","' + D + "\")' href='javascript:void(0)'>发私信</a>";
                z += "<div id='" + N + "'  class='wblist'>";
                z += "<div class='wbl'><a class='pl' href='home.php?uid=" + N + "&gsid=" + gsid + "'><img class='por' alt='头像' src='" + M + "'></a></div>";
                z += "<div class='wbr'><div class='gz_btn inline'>";
                if (!Q) {
                    if (B == "myatt") {
                        z += "<div class='select' onclick='atenfz(this,\"" + N + "\")'><span>分组</span><div></div></div>"
                    }
                    if ((B == "myfans") || (B == "otherfans") || (B == "otheratt") || (B == "star")) {
                        if (C == "0") {
                            z += U
                        } else {
                            z += F
                        }
                        if (B == "myfans") {
                            z += O
                        }
                    }
                    if (B == "searchUser") {
                        z += "<a id='atme' href='javascript:void(0);'>@" + K + "</a><br>";
                        if (C == "1") {
                            z += F
                        } else {
                            z += U
                        }
                    }
                }
                z += "</div><div class='qy'><div class='rm'><a class='nk' href='home.php?uid=" + N + "&gsid=" + gsid + "'>";
                if (Q) {
                    z += "我"
                } else {
                    z += D
                }
                z += "</a>";
                if (!Q) {
                    if (I != 0) {
                        z += "<img alt='V'  src='" + I + "'>"
                    }
                }
                z += "</div>";
                if (V != undefined) {
                    z += "粉丝(" + V + ")"
                }
                if (H != undefined) {
                    z += H
                }
                if (B == "searchUser") {
                    if (G != undefined) {
                        z += "<br>" + G
                    }
                }
                if (B != "searchUser") {
                    z += "</div><div class='cont'>"
                }
                if (B == "myatt") {
                    if ((J != undefined) && (J == "1")) {
                        z += "<div class='delfs pb'>"
                    }
                    if ((J != undefined) && (J == "0")) {
                        z += "<div class='delfs pbcatg'>"
                    }
                    z += "<a id='atme' class='' href='javascript:void(0)'>@" + K + "</a><a id='recom' href='javascript:void(0)'>推荐</a>";
                    if ((J != undefined) && (J == "1")) {
                        z += O
                    }
                    z += F;
                    z += "</div></div></div></div>"
                }
                if ((B == "myfans") || (B == "otherfans") || (B == "otheratt") || (B == "star")) {
                    z += "<div class='newbtn'>";
                    if (!Q) {
                        z += "<a id='atme' ";
                        if (B == "otheratt" || B == "otherfans" || B == "star") {
                            z += " class='litbtnr'"
                        } else {
                            z += "class='litbtn'"
                        }
                        z += "href='javascript:void(0)'>@" + K + "</a>";
                        if (B == "myfans") {
                            z += "<a class='litbtnr' onclick='delfans(\"" + N + '","' + D + "\")' href='javascript:void(0)'>移除</a>"
                        }
                    }
                }
                z += "</div></div></div></div>"
            });
            $("#plist").html(z);
            if (B != "searchUser") {
                wblbind()
            }
            resetevt()
        }
    }
    function q(A) {
        var y = ($("#loginuid").attr("data")).trim();
        login(gsid);
        var z = "";
        if (A != null) {
            $.each(A, function (S, Q) {
                var M = Q.srctype;
                var N = Q["new"];
                var U = Q.content;
                var F = Q.time;
                var T = Q.srcid;
                var G = Q.srctitle;
                var I = Q.showMoreSrc;
                var C = Q.srcuid;
                var K = Q.uid;
                var R = Q.srcnick;
                var B = Q.nick;
                var D = Q.vip;
                var J = Q.img;
                var O = Q.gender;
                var H = T + "sina" + S + "sina" + K;
                $(".wblist").wrapAll("<div id='cmtlist'></div>");
                z += "<div id=" + H + " class='wblist'>";
                if (J != "0") {
                    z += "<div class='wbl'><a class='pl' href='home.php?uid=" + K + "&gsid=" + gsid + "'><img class='por' alt='头像' src='" + J + "'></a></div> <div class='wbr'>"
                } else {
                    z += "<div class='wbr wtx'>"
                }
                z += "<div class='wbtil'><div><a class='nk' href='home.php?uid=" + K + "&gsid=" + gsid + "'>" + B;
                if (D != "0") {
                    z += "<img alt='V' src='" + D + "'>"
                }
                z += "</a></div><span class='vip'>" + F + "</span></div><p>";
                if (N == "1") {
                    z += "<span class='red'>[新]</span>"
                }
                if (M == "0") {
                    z += "评论"
                } else {
                    z += "回复"
                }
                z += "<a class='nk' href='home.php?uid=" + C + "&gsid=" + gsid + "'>" + R + "</a>";
                if (M == "0") {
                    z += "的微博"
                } else {
                    z += "的评论"
                }
                if (D != "0") {
                    z += "<img alt='V' src='" + D + "'>"
                }
                z += "：" + U + "</p><dl class='tip'><dt></dt><dd>";
                z += "<a class='nk' href='home.php?uid=" + C + "&gsid=" + gsid + "'>" + R + "</a>";
                if (C != y) {
                    if (D != "0") {
                        z += "<img alt='V' src='" + D + "'>"
                    }
                }
                if (M != "0") {
                    z += "评论说"
                }
                z += "：<span><a href='comment.php?srcid=" + T + "&rl=1&gsid=" + gsid + "'>" + G;
                if (I != "0") {
                    z += "..."
                }
                z += "</a></span></dd></dl><div id='topic' class='wb_fb wb_pl'><a id='hf' href='javascript:void(0)'>回复";
                if (O == "0") {
                    z += "他"
                }
                if (O == "1") {
                    z += "她"
                }
                z += "</a></div></div></div>"
            });
            $("#cmtlist").html(z);
            wblbind();
            resetevt()
        }
    }
    function r(A) {
        var y = ($("#loginuid").attr("data")).trim();
        login(gsid);
        var z = "";
        if (A != null) {
            $.each(A, function (N, M) {
                var K = M.srctype;
                var Q = M.content;
                var D = M.time;
                var O = M.srcid;
                var F = M.srctitle;
                var H = M.showMoreSrc;
                var J = M.uid;
                var B = M.nick;
                var C = M.vip;
                var I = M.img;
                var G = O + "sina" + N + "sina" + J;
                $(".wblist").wrapAll("<div id='cmtlist'></div>");
                z += "<div id=" + G + " class='wblist'>";
                if (I != "0") {
                    z += "<div class='wbl'><a class='pl' href='home.php?uid=" + J + "&gsid=" + gsid + "'><img class='por' alt='头像' src='" + I + "'></a></div> <div class='wbr'>"
                } else {
                    z += "<div class='wbr wtx'>"
                }
                z += "<div class='wbtil'><span class='vip'>" + D + "</span></div><p>";
                if (K == "0") {
                    z += "评论&nbsp;"
                }
                if (K == "1") {
                    z += "回复"
                }
                z += "<a class='nk' href='home.php?uid=" + J + "&gsid=" + gsid + "'>";
                if (J == y) {
                    z += "我"
                } else {
                    z += B
                }
                z += "</a>";
                if (C != "0") {
                    z += "<img alt='V' src='" + C + "'>"
                }
                z += "的";
                if (K == "0") {
                    z += "微博"
                }
                if (K == "1") {
                    z += "评论"
                }
                z += ":" + Q + "</p><dl class='tip'><dt></dt><dd><a class='nk' href='home.php?uid=" + J + "&gsid=" + gsid + "'>";
                if (J == y) {
                    z += "我"
                } else {
                    z += B
                }
                z += "</a>";
                if (C != "0") {
                    z += "<img alt='V' src='" + C + "'>"
                }
                if (K == "1") {
                    z += "评论说"
                }
                z += "：<a href='comment.php?srcid=" + O + "&rl=1&gsid=" + gsid + "'>" + F;
                if (H != "0") {
                    z += "..."
                }
                z += "</a></dd></dl><div id='topic' class='wb_fb wb_pl'><a class='del' onclick='delwb(\"" + G + "\",\"delmyc\")' href='javascript:void(0)'>删除</a></div></div></div>"
            });
            $("#cmtlist").html(z);
            wblbind()
        }
    }
    function u(M, J, D) {
        var y = ($("#loginuid").attr("data")).trim();
        login(gsid);
        var I = M.uid;
        var C = M.img;
        var z = M.vip;
        var N = M.nick;
        var K = J.uid;
        var H = J.img;
        var B = J.vip;
        var A = J.nick;
        var F = getQuery("uid");
        var G = "";
        if (D != null) {
            $(".msglist").wrapAll("<div id='chatlist'></div>");
            var y = ($("#loginuid").attr("data")).trim();
            $.each(D, function (R, T) {
                var V = K + "sina" + R;
                var U = T.time;
                var S = T.type;
                var Q = T.status;
                var O = T.content;
                if (S == "1") {
                    G += "<div id='" + V + "' class='msglist lir'> "
                }
                if (S == "0") {
                    G += "<div id='" + V + "' class='msglist'> "
                }
                if (S == "1") {
                    G += "<div class='wbr'><p class='msg_ctr'><a class='nk' href='home.php?uid=" + K + "&gsid=" + gsid + "'>我</a>:" + O + "</span>&nbsp;(" + U + ")</span></p>";
                    G += "<div class='jctr'></div></div>";
                    G += "<div class='wbl'><a class='pl' href='home.php?uid=" + I + "&gsid" + gsid + "'><img class='por' alt='头像' src='" + C + "'></a></div>"
                }
                if (S == "0") {
                    G += "<div class='wbr'><p class='msg_ct'><a class='nk' href='home.php?uid=" + K + "&gsid=" + gsid + "'>" + A + "</a>:" + O + "</span>&nbsp;(" + U + ")</span></p>";
                    G += "<div class='jct'></div></div>";
                    G += "<div class='wbl'><a class='pl' href='home.php?uid=" + K + "&gsid" + gsid + "'><img class='por' alt='头像' src='" + H + "'></a></div>"
                }
                G += "<div class='msgbtn'><a class='delmsg' onclick='delwb(\"" + V + "\",\"delchat\")' href='javascript:void(0)'>删除</a>";
                if (S == "0") {
                    G += "<a class='hfmsg' onclick='newmsg(this,\"" + V + '","' + A + "\")' href='javascript:void(0)'>回复</a>"
                }
                G += "<a class='hfmsg' onclick='prevatfor(this)' href='javascript:void(0)'>转发</a></div></div>"
            });
            $("#chatlist").html(G);
            msgevt()
        }
    }
    function a(B) {
        var y = ($("#loginuid").attr("data")).trim();
        login(gsid);
        var A = getQuery("uid");
        var z = "";
        if (B != null) {
            $(".wblist").wrapAll("<div id='grouplist'></div>");
            var y = ($("#loginuid").attr("data")).trim();
            $.each(B, function (N, M) {
                var O = M.content;
                var H = M.count;
                var G = M.img;
                var I = M["new"];
                var C = M.nick;
                var F = M.status;
                var D = M.time;
                var J = M.type;
                var K = M.vip;
                z += "<div id='" + N + "' class='wblist'> ";
                if (G != "0") {
                    z += "<div class='wbl'>";
                    z += "<a class='pl' href='home.php?uid=" + N + "&gsid=" + gsid + "'>";
                    z += "<img class='por' alt='头像' src='" + G + "'/>";
                    z += "</a></div>";
                    z += "<div id='" + C + "' class='wbr'>"
                } else {
                    z += "<div id='" + C + "' class='wbr wtx'>"
                }
                if (J == "1") {
                    z += "<p class='msg_cont'>我发给<a class='nk' href='home.php?uid=" + N + "&gsid=" + gsid + "'>" + C + "</a>:" + O + "<span>(" + D + ")</span></p>"
                } else {
                    z += "<p class='msg_cont'>来自<a class='nk' href='home.php?uid=" + N + "&gsid=" + gsid + "'>" + C + "</a>:" + O + "<span>(" + D + ")</span></p>"
                }
                z += "<div class='tybtn'><a class='cc' href='/dpool/ttt/h5/msg.php?cat=3&uid=" + N + "&gsid=" + gsid + "'>共" + H + "条对话</a>";
                z += "<a onclick='sendmsg(event,\"" + N + '","' + C + "\")' href='javascript:void(0)'>回复</a>";
                z += "<a class='cc' onclick='delwb(\"" + N + "\",\"delallchat\")' href='javascript:void(0)'>清空</a></div></div></div>"
            });
            $("#grouplist").html(z);
            wblbind()
        }
    }
    function t(F, B) {
        var z = "";
        var y = $.trim($("#loginuid").attr("data"));
        login(gsid);
        var A = getQuery("uid");
        var D = ((window.location.href).indexOf("cat=1") != -1);
        var C = ((A == false) && !D) || (F == "otherAtMsg");
        if (B != null) {
            $.each(B, function (an, ae) {
                var O = (an.indexOf("sinaat") != -1);
                var G = an.split("sina");
                var R = G[0];
                var Z = G[1];
                var N = changestr(ae.cont);
                var T = ae.img;
                var aj = ae.info;
                var Q = aj[0];
                var ad = aj[1];
                var H = aj[2];
                var ah = aj[3];
                var Y = aj[4];
                var ac = ae.vip;
                var aa = ae.gender;
                var am = (ae.img != "0");
                var V = "他";
                if (aa == "1") {
                    V = "她"
                }
                var ab = ae.pic;
                var S = ae.zf;
                var X = (R == y);
                var M = (an.indexOf("sinafav") != -1);
                var al = (an.indexOf("sinaat") != -1);
                z += "<div id='" + an + "' class='mlist'>";
                if (am && C) {
                    z += "<div class='wbl'>";
                    z += "<a class='pl' href='home.php?uid=" + R + "&gsid=" + gsid + "'>";
                    z += "<img class='por' alt='头像' src='" + T + "'/>";
                    z += "</a></div>";
                    z += "<div id='" + Q + "'";
                    if (R == y) {
                        z += "id='我'"
                    } else {
                        z += "id='" + Q + "'"
                    }
                    z += "class='wbr'>"
                } else {
                    z += "<div id='" + Q + "'";
                    if (R == y) {
                        z += "id='我'"
                    } else {
                        z += "id='" + Q + "'"
                    }
                    z += "class='wbr wtx'>"
                }
                z += "<div class='wbtil'>";
                if (C) {
                    z += "<div><a class='nk' href='home.php?uid=" + R + "&gsid=" + gsid + "'>";
                    if (X) {
                        z += "我"
                    } else {
                        z += Q
                    }
                    z += "</a>";
                    if (!X) {
                        if (ac != "0") {
                            z += "<img alt='V' src='" + ac + "'/>"
                        }
                    }
                    z += "</div>"
                }
                z += "<span class='vip'>" + ad + "</span>";
                z += "</div><p>" + N + "</p>";
                if (ab != undefined) {
                    z += "<img class='wbimg' onclick='showpic(\"" + ab[1] + '","' + ab[2] + "\")' src='" + ab[0] + "' alt='图片'/>";
                    z += "<a class='omg' href='javascript:orgpic(\"" + ab[2] + "\",1)'>原图</a>"
                }
                if (S != undefined) {
                    var ag = (S[0].split("sina"))[0];
                    var W = (S[0].split("sina"))[1];
                    var af = S[1][0];
                    var K = S[1][1];
                    var J = S[2];
                    var ai = S[3];
                    var U = S[4];
                    var I = S[5];
                    z += "<dl id='" + S[0] + "' class='tip'>";
                    z += "<dt id=''></dt><dd id=''>";
                    z += "<a href='home.php?uid=" + ag + "&gsid=" + gsid + "'>@" + af + "</a>";
                    if (K != "0") {
                        z += "<img alt='V' src='" + K + "'/>"
                    }
                    z += "<p>" + J + "</p>";
                    z += "<div>原文转发";
                    if (ai != "0") {
                        z += ai
                    }
                    z += "&nbsp;|&nbsp;<a data='comment.php?srcid=" + W + "&rl=0&gsid=" + gsid + "#wbom' href='javascript:void(0)' onclick='jump(this)'>原文评论";
                    if (U != "0") {
                        z += U
                    }
                    z += "</a></div>";
                    if (I != undefined) {
                        z += "<img class='wbimg' onclick='showpic(\"" + I[1] + '","' + I[2] + "\")' src='" + I[0] + "' alt='图片'/>";
                        z += "<a class='omg' href='javascript:orgpic(\"" + I[2] + "\",1)'>原图</a>"
                    }
                    z += "</dd></dl>"
                }
                z += "<div class='wbom'><div>来自" + H + "</div>";
                z += "<span> <a onclick='transmit(event,this)' href='javascript:void(0)'>转发";
                if (ah != "0") {
                    z += "<b>" + ah + "</b>"
                }
                z += "</a>&nbsp;|&nbsp;";
                if (Y != "0") {
                    z += "<img src='http://u1.sinaimg.cn/upload/h5/img/blank.gif' class='uplist'>"
                }
                z += "<a onclick='plist(event,this)' href='javascript:void(0)'>评论";
                if (Y != "0") {
                    z += "<b>" + Y + "</b>"
                }
                z += "</a>&nbsp;|&nbsp;";
                var ak = (ua.indexOf("android") != -1);
                if (ak) {
                    z += "<a id='androidMore' href='javascript:void(0)'><select>";
                    z += "<option value='moreopt'>取消操作</option>";
                    if ((X && F != "otherAtMsg") || F == "myAtMsg") {
                        if (!M) {
                            z += "<option value='delwb'>删除</option>"
                        }
                    }
                    if (!M) {
                        z += "<option value='addfave'>收藏</option>"
                    } else {
                        z += "<option value='delfave'>取消收藏</option>"
                    }
                    if ((!X) || O) {
                        z += "<option value='atother'>@" + V + "</option>";
                        z += "<option value='jb'>举报</option>"
                    }
                    z += "</select>更多</a>"
                } else {
                    z += "<a href='javascript:void(0)' id='more' data='" + (an + "sina" + Q) + "' gender='" + V + "'>更多</a>"
                }
                z += "</span></div></div></div>"
            });
            $("#list").html(z);
            $(".mlist").find(".wbom").find("#more").click(function () {
                $(this).bind("touchend", function (G) {
                    G.stopPropagation()
                });
                m(F, this);
                return false
            });
            $(".mlist").find(".wbom").find("#androidMore").find("select").change(function () {
                v(this)
            })
        }
    }
    function m(O, G) {
        var C = $(G).parents(".mlist").attr("id");
        var z = (C.indexOf("sinafav") != -1);
        var A = (C.indexOf("sinaat") != -1);
        var H = $(G).parents(".mlist");
        var I = $("#loginuid").attr("data");
        var J = C.split("sina");
        var M = J[0];
        var N = J[1];
        var y = $(G).parents(".wbr").attr("id");
        var B = C;
        if (B.indexOf("fav") != -1) {
            B = B.split("sinafav")[0]
        }
        if (B.indexOf("at") != -1) {
            B = B.split("sinaat")[0]
        }
        var F = $(G).attr("gender");
        var D = B + "sina" + y;
        $("mlist").removeClass("focus");
        H.addClass("focus");
        if ($("#more" + C).length == 0) {
            login(gsid);
            var K = "<div id='more" + C + "' class='shie show'><div class='dia wdia'>";
            K += "<div class='dia_n d_m'>";
            if (!z) {
                if (O == "myAtMsg") {
                    K += "<a href='javascript:void(0)' onclick=' removedia();delwb(\"" + N + '","delat")\'>删除</a>'
                }
                if (I == M && O != "otherAtMsg" && O != "myAtMsg") {
                    K += "<a href='javascript:void(0)' onclick=' removedia();delwb(\"" + N + '","delwb")\'>删除</a>'
                }
                K += "<a href='javascript:void(0)' onclick='removedia();addfave(event,this,\"" + N + "\");'>收藏</a>";
                if (I != M) {
                    K += "<a href='javascript:void(0)' onclick='removedia();atother(\"" + C + '","' + y + "\")'>@" + F + "</a>";
                    K += "<a href='javascript:void(0)' class='jbr' data=\"" + B + "sina" + y + '">举报</a>'
                }
            } else {
                K += "<a href='javascript:void(0)' onclick='removedia();delwb(\"" + N + '","delfav",this,"qxsc")\'>取消收藏</a>';
                if (I != M) {
                    K += "<a href='javascript:void(0)' onclick='removedia();atother(\"" + C + '","' + y + "\")'>@" + F + "</a>";
                    K += "<a href='javascript:void(0)' class='jbr' data='" + D + "'>举报</a>"
                }
            }
            K += "</div></div></div>";
            $("body").append(K);
            showdia("more" + C, G)
        } else {
            if ($("#more" + C).is(":hidden")) {
                dia("more" + C, G)
            } else {
                $("#more" + C).hide()
            }
        }
    }
    function x(F) {
        var G = ($.trim(F)).split("sina");
        var H = G[0];
        var C = G[1];
        var y = G[2];
        var z = root + "complaint.php?uid=" + H + "&type=1&group=3&st=" + st + "&gsid=" + gsid;
        var D = 100;
        var A = screen.height;
        var B = "height=" + D + ", width=" + D;
        window.open(z, "新浪微博-举报", B)
    }
    $(".wbom").find("#more").unbind("click");
    $(".wbom").find("#more").click(function () {
        $(this).bind("touchend", function (S) {
            S.stopPropagation()
        });
        var Q = $(".page").attr("position");
        var C = $(this).parents(".mlist").attr("id");
        var F = this;
        var G = $(F).parents(".mlist");
        $("mlist").removeClass("focus");
        G.addClass("focus");
        if ($("#more" + C).length == 0) {
            login(gsid);
            var R = navigator.appVersion;
            var N = $.trim(R.split(";")[2]).toLowerCase();
            var O = (N.indexOf("android") != -1);
            var H = $("#loginuid").attr("data");
            var I = C.split("sina");
            var K = I[0];
            var M = I[1];
            var y = $(this).parents(".wbr").attr("id");
            var B = C;
            if (B.indexOf("fav") != -1) {
                B = B.split("sinafav")[0]
            }
            if (B.indexOf("at") != -1) {
                B = B.split("sinaat")[0]
            }
            var D = $(this).attr("data");
            var z = (C.indexOf("sinafav") != -1);
            var A = (C.indexOf("sinaat") != -1);
            if (!O) {
                var J = "<div class='shie show' id='more" + C + "'><div class='dia wdia'>";
                J += "<div class='dia_n d_m'>";
                if (!z) {
                    J += "<a href='javascript:void(0)' onclick='removedia();addfave(event,this,\"" + M + "\");'>收藏</a>";
                    if (H != K) {
                        J += "<a href='javascript:void(0)' onclick='removedia();atother(\"" + C + '","' + y + "\")'>@" + D + "</a>";
                        J += "<a href='javascript:void(0)' class='jbr' data=\"" + B + "sina" + y + '">举报</a>'
                    }
                    if (Q == "myAtMsg") {
                        J += "<a href='javascript:void(0)' onclick=' removedia();delwb(\"" + M + '","delat")\'>删除</a>'
                    }
                    if (H == K && Q != "otherAtMsg" && Q != "myAtMsg") {
                        J += "<a href='javascript:void(0)' onclick=' removedia();delwb(\"" + M + '","delwb")\'>删除</a>'
                    }
                } else {
                    J += "<a href='javascript:void(0)' onclick='removedia();delwb(\"" + M + '","delfav",this,"qxsc")\'>取消收藏</a>';
                    if (H != K) {
                        J += "<a href='javascript:void(0)' onclick='removedia();atother(\"" + C + '","' + y + "\")'>@" + D + "</a>";
                        J += "<a href='javascript:void(0)' class='jbr' data=\"" + B + "sina" + y + '">举报</a>'
                    }
                }
                J += "</div></div></div>";
                $("body").append(J);
                showdia("more" + C, F)
            }
        } else {
            if ($("#more" + C).is(":hidden")) {
                dia("more" + C, F)
            } else {
                $("#more" + C).hide()
            }
        }
        return false
    })
}
function forwarding(h, c, d) {
    var f = $("div[id^='" + h + "']"),
        g = f.find(".wbr");
    if (d) {
        var g = f.find(".msgbtn"),
            a = g.html()
    }
    g.find("#topic").hide();
    if (g.find("#zfd").length == 0) {
        var b = "<div id='zfd' class='topic'><form name='rtform'><div class='send_msg'><span>发送给：</span><a id='xzsel' onclick='showfs(this," + d + ")' href='javascript:void(0)'>选择</a><div><input id='fsnick' type='text' name='nick' value=''></div></div><div><textarea name='msgContent' class='inp5 tpc'>" + c + "</textarea></div></form><div class='wb_fb tfb'><a class='qx' href='javascript:void(0)'>取消</a><a class='qk' href='javascript:void(0)'>清空</a><img class='face' onclick='bindface(this)' src='http://u1.sinaimg.cn/upload/h5/img/face_icon.png'><a class='qd' href='javascript:void(0)'>发布</a><span>还剩300字</span></div></div>";
        if (d) {
            g.html(b)
        } else {
            g.append(b)
        }
        f.find("#atmect").hide();
        g.find("#zfd").show();
        g.find("#fsnick").val("");
        g.find("#zfd").find("textarea").blur(function () {
            clearInterval(editime)
        });
        g.find("#zfd").find("textarea").focus(function () {
            $(this).css({
                color: "#000000"
            });
            $(this).animate({
                height: "100px"
            }, "fast");
            setFocus(this);
            var j = this;
            editime = setInterval(function () {
                zsxz(j, $(j).parents(".topic").find(".wb_fb").find("span"), 300)
            }, 300);
            return false
        });
        g.find("#zfd").find(".tfb").find("a").eq(0).click(function () {
            if (d) {
                g.html(a);
                g.hide()
            } else {
                $(this).parents(".wbr").find(".wb_pl").show();
                $(this).parents(".wbr").find("#zfd").find("textarea").css({
                    height: "28px"
                });
                $(this).parents(".wbr").find("#zfd").find("textarea").val(c);
                $(this).parents(".wbr").find("#zfd").hide()
            }
        });
        g.find("#zfd").find(".tfb").find("a").eq(1).click(function () {
            $(this.parentNode.parentNode).find("textarea").val("")
        });
        g.find("#zfd").find(".tfb").find("a").eq(2).click(function () {
            var m = $(this).parents("#zfd").find("input").val(),
                j = $(this).parents("#zfd").find("textarea").val();
            if ($.trim(m) == "" || $.trim(j) == "") {
                return
            }
            var k = datapak($(this).parents("#zfd").find("form")),
                l = $(this).parents(".wbr");
            if (d) {
                l = $(this).parents(".msgbtn")
            }
            $(this).parents(".topic").hide();
            $(".facebox").hide();
            login(gsid);
            $.ajax({
                url: root + "iajax.php?st=" + st + "&act=mbtomsg&gsid=" + gsid,
                data: k,
                global: false,
                success: function (o) {
                    var n = $.parseJSON(o);
                    tipinfo(l, n.msg, function () {
                        if (d) {
                            l.html(a)
                        }
                    })
                }
            });
            return false
        })
    } else {
        g.find("#zfd").show();
        g.find("#zfd").find("textarea").val(c)
    }
}
function showfs(b, l) {
    if (ua.indexOf("android") > 0) {
        var a = $(b).parent().find("input")[0].className;
        if (l == "wq") {
            var f = "mygroup"
        } else {
            var f = "fans"
        }
        window.open("android/fans.php?sel=" + a + "&act=" + f + "&first=1&gsid=" + gsid, "列表", "width=150,height=200");
        return
    }
    $(b).bind("touchend", function (n) {
        n.stopPropagation()
    });
    var c = "",
        g = 1,
        m = b.innerHTML.split(" ")[1],
        h;
    if ($(".fsbox").length == 1) {
        $(".fsbox").remove();
        b.innerHTML = "+ " + m;
        return
    } else {
        b.innerHTML = "- " + m
    }
    if (l == "wq") {
        var k = "mygroup",
            d = "输入要查询的微群",
            a = $(b).parents(".mlist")[0].id.split("sina")[1],
            j = "我的微群"
    } else {
        var k = "getfans",
            d = "输入要查询的呢称",
            a = "",
            j = "我的粉丝"
    }
    $.ajax({
        url: root + "iajax.php?st=" + st + "&act=" + k + "&id=" + a + "&gsid=" + gsid,
        global: false,
        success: function (p) {
            var n = $.parseJSON(p);
            if (n.ok == 0 && l != "wq") {
                c = "系统故障，请稍候访问!";
                alert(c);
                return
            }
            if (n.ok == 0 && l == "wq") {
                c = "获取微群信息失败！";
                alert(c);
                return
            }
            if (n.ok == -1 && l == "wq") {
                c = "该条微博不存在或已删除！";
                alert(c);
                return
            }
            h = Math.ceil(n.count / 10);
            $.each(n.data, function (q, r) {
                c += "<div id='" + q + "' class='fslist'>" + r + "</div>"
            });
            var o = "<div class='box fsbox'><div class='tch'><div class='fs_inp'> <input onclick=\"fsearch('" + l + "')\" type='button' value=''> <div><input id='fskw' type='text' name='keyword' placeholder='" + d + "' value='' size='15' style='color: rgb(153, 153, 153); '></div> </div><div class='rollbk slide'><div class='rollfs'><div id='p1' class='dqpg'>" + c + "</div></div></div><div class='til'><div class='facemid'>" + j + "<span>1</span>/<span>" + h + "</span></div><a class='facel' onClick=\"pageRoll(1,'" + l + "')\" href='javascript:void(0)'></a><a class='facer' onClick=\"pageRoll(-1,'" + l + "')\" href='javascript:void(0)'></a></div></div></div>";
            $("body").append(o);
            $(".rollbk").height($("#p" + g).find(".fslist").length * $("#p" + g).find(".fslist").outerHeight());
            $(".box").click(function (q) {
                q.stopPropagation()
            });
            $(".fsbox").find(".tipcl").click(function () {
                $(".fsbox").remove()
            });
            $(".fsbox").css({
                top: $(b).offset().top + 30,
                "margin-left": $(window).width() - $(".fsbox").width() - 15
            });
            $(".fslist").click(function () {
                fx(this, l)
            })
        }
    });
    return false
}
var qch = [],
    gid = [];

function fx(b, a) {
    $(".bxz").attr("class", "fslist");
    if (b.className == "fslist fxk" || b.className == "fslist fsta") {
        $(".fxk").attr("class", "fslist fsta");
        $(b).attr("class", "fslist bxz")
    } else {
        $(".fxk").attr("class", "fslist fsta");
        $(b).addClass("fxk")
    }
    if (b.className == "fslist fxk" || b.className == "fslist fsta") {
        qch.push($(b).text());
        gid.push($(b)[0].id)
    } else {
        qch.remove($(b).text());
        gid.remove($(b)[0].id)
    }
    if (a && a != "undefined") {
        if (a == "wq") {
            $(".focus").find("#gname").val(qch.distinct().join(";"));
            $(".focus").find("#gid").val(gid.distinct().join(";"))
        } else {
            $(".xzct").find("#fsnick").val(qch.distinct().join(";"))
        }
    } else {
        $(".focus").find("#fsnick").val(qch.distinct().join(";"))
    }
}
Array.prototype.distinct = function () {
    var a = this;
    var b = this.concat().sort();
    b.sort(function (d, c) {
        if (d == c) {
            var f = a.indexOf(d);
            a.splice(f, 1)
        }
    });
    return a
};
Array.prototype.indexOf = function (b) {
    for (var a = 0; a < this.length; a++) {
        if (this[a] == b) {
            return a
        }
    }
    return -1
};
Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a > -1) {
        this.splice(a, 1)
    }
};

function fsearch(b) {
    if (b == "wq") {
        var a = "mygroup"
    } else {
        var a = "getfans"
    }
    $.ajax({
        url: root + "iajax.php?st=" + st + "&searchGroup=1&act=" + a + "&keyword=" + $("#fskw").val() + "&gsid=" + gsid,
        global: false,
        success: function (h) {
            var c = $.parseJSON(h),
                g = 1,
                d = "";
            if (c.ok == 0) {
                var f = "<div class='fsmsg'>没有相关粉丝！</div>"
            } else {
                g = Math.ceil(c.count / 10);
                $.each(c.data, function (k, l) {
                    d += "<div id='" + k + "' class='fslist'>" + l + "</div>"
                });
                var f = "<div id='p1' class='dqpg'>" + d + "</div>"
            }
            $(".rollfs").html(f);
            var j = 1;
            $(".rollbk").height($("#p" + j).find(".fslist").length * $("#p" + j).find(".fslist").outerHeight());
            $(".fslist").click(function () {
                fx(this, b)
            });
            $(".facemid>span:first").text(1);
            $(".facemid>span").eq(1).text(g)
        }
    })
}
function pageRoll(c, g) {
    var j = parseInt($(".facemid>span:first").text()) - c,
        f = $(".facemid>span").eq(1).text();
    if (j > f) {
        j = 1
    } else {
        if (j == 0) {
            j = f
        }
    }
    if (g == "wq") {
        var a = "mygroup"
    } else {
        var a = "getfans"
    }
    if ($("#p" + j).length == 0) {
        var b = $(".til").html();
        $(".til").html("");
        $(".til").addClass("tilload");
        $.ajax({
            url: root + "iajax.php?st=" + st + "&act=" + a + "&keyword=" + $("#fskw").val() + "&page=" + j + "&gsid=" + gsid,
            global: false,
            success: function (o) {
                var k = $.parseJSON(o),
                    l = "";
                $.each(k.data, function (q, r) {
                    l += "<div id='" + q + "' class='fslist'>" + r + "</div>"
                });
                var n = "<div id='p" + j + "' class='dqpg'>" + l + "</div>";
                $(".rollfs").append(n);
                $(".til").html(b);
                $(".rollbk").height($("#p" + j).find(".fslist").length * $("#p" + j).find(".fslist").outerHeight());
                $(".til").removeClass("tilload");
                $(".fslist").click(function () {
                    fx(this, g)
                });
                if (c < 0) {
                    $("#p" + j).attr("class", "dqpg csin");
                    $("#p" + j).attr("class", "dqpg in");
                    var m = (j - 1) == f ? 1 : (j - 1);
                    $("#p" + m).attr("class", "dqpg out")
                } else {
                    $("#p" + j).attr("class", "dqpg csout");
                    $("#p" + j).attr("class", "dqpg inreverse");
                    var p = j == f ? 1 : (j + 1);
                    $("#p" + p).attr("class", "dqpg outreverse")
                }
                $(".facemid>span:first").text(j)
            }
        })
    } else {
        $(".rollbk").height($("#p" + j).find(".fslist").length * $("#p" + j).find(".fslist").outerHeight());
        if (c < 0) {
            $("#p" + j).attr("class", "dqpg csin");
            $("#p" + j).attr("class", "dqpg in");
            var d = (j - 1) == 0 ? f : (j - 1);
            $("#p" + d).attr("class", "dqpg out")
        } else {
            $("#p" + j).attr("class", "dqpg csout");
            $("#p" + j).attr("class", "dqpg inreverse");
            var h = j == f ? 1 : (j + 1);
            $("#p" + h).attr("class", "dqpg outreverse")
        }
        $(".facemid>span:first").text(j)
    }
}
function resetevt() {
    $(".wblist").each(function () {
        $(this).find("#hf").click(function () {
            var d = $(this).parents(".wblist").attr("id").split("sina")[0],
                b = $(this).parents(".wblist").find(".wbtil").find("a").text(),
                a = $(this).parents(".wblist").attr("id").split("sina")[1];
            var c = "<div id='repmod' class='topic'><div class='topic_til'><div>回复" + b + "</div><span>还剩140字</span></div><form><div><input type='hidden' name='act' value='addReply'><input type='hidden' name='srcid' value='" + d + "'><input type='hidden' name='cmtid' value='" + a + "'><textarea name='content' class='inp5 tpc'></textarea><div class='checkb'><div class='tszf'><input id='" + a + "6' type='checkbox' name='rt'><label for='" + a + "6'>同时转发到我的微博</lable></div></div></form><div class='wb_fb tfb'><a class='qx' href='javascript:void(0)'>取消</a><a class='qk' href='javascript:void(0)'>清空</a><img id='face' src='http://u1.sinaimg.cn/upload/h5/img/face_icon.png'><a class='qd' href='javascript:void(0)'>回复</a></div></div>";
            topicmod($(this).parents(".wblist"), c, "repmod", ".wb_pl", root + "commentDeal.php?gsid=" + gsid, 140, "hf")
        });
        $(this).find("#atme").click(function () {
            var d = $(this).parents(".wblist").attr("id"),
                b = $(this).parents(".wblist").find(".rm").find("a").text(),
                f = "atmect",
                a = ".cont";
            if ($(this).parents(".wblist").find(".wbtil").length != 0) {
                b = $(this).parents(".wblist").find(".wbtil").find("a").text();
                a = ".wb_pl"
            }
            $("wblist").removeClass("focus");
            $(this).parents(".wblist").addClass("focus");
            var c = "<div id='" + f + "' class='topic'><div class='topic_til' style='display:block'><div>有什么话想对" + b + "说：</div><span>还剩140字</span></div><form><div><input type='hidden' name='act' value='tjhy'><textarea name='content' class='inp5 tpc'>对@" + b + " 说：</textarea></div></form><div class='wb_fb tfb'><a id='tjqx' class='qx' href='javascript:void(0)'>取消</a><a id='tjqk' class='qk' href='javascript:void(0)'>清空</a><img id='face' src='http://u1.sinaimg.cn/upload/h5/img/face_icon.png'><a id='tjqd' class='qd' href='javascript:void(0)'>确定</a></div></div>";
            topicmod($(this).parents(".wblist"), c, f, a, root + "iajax.php?act=tjhy&bkmsg=at&gsid=" + gsid);
            return false
        });
        $(this).find("#recom").click(function () {
            var d = $(this).parents(".wblist").attr("id"),
                b = $(this).parents(".wblist").find(".rm").find("a").text(),
                f = "recommend",
                a = ".cont";
            var c = "<div id='recommend' class='topic'><div class='topic_til' style='display:block'><div>说说推荐理由吧：</div><span>还剩140字</span></div><form><div><input type='hidden' name='act' value='tjhy'><textarea name='content' class='inp5 tpc'>快来看看 @" + b + " 的微博</textarea></div></form><div class='wb_fb tfb'><a id='tjqx' class='qx' href='javascript:void(0)'>取消</a><a id='tjqk' class='qk' href='javascript:void(0)'>清空</a><img id='face' src='http://u1.sinaimg.cn/upload/h5/img/face_icon.png'><a id='tjqd' class='qd' href='javascript:void(0)'>确定</a></div></div>";
            topicmod($(this).parents(".wblist"), c, f, a, root + "iajax.p