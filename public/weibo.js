




var xiaoxiaoWB = {
			timeline : function(json,targetId,countNumber,screenName,method){
			WB2.anyWhere(function(W){
			W.parseCMD(json, function(sResult, bStatus){
						if(bStatus){
							$(targetId).find('#loading').remove();
							$(targetId).empty();
							for(i=0;i<sResult.length;i++){
								if( sResult[i].retweeted_status){
									var weiboContent={
										userProfileImgUrl: sResult[i].user.profile_image_url,
										userScreenName:    sResult[i].user.screen_name,
										tweetText:         sResult[i].text,
										originalPic:       sResult[i].original_pic,
										thumbnailPic:      sResult[i].thumbnail_pic,
										source:            sResult[i].source,
										r_retweetedStatus: sResult[i].retweeted_status,
										r_thumbnailPic:    sResult[i].retweeted_status.thumbnail_pic,
										r_originalPic:     sResult[i].retweeted_status.original_pic,
										r_tweetText:       sResult[i].retweeted_status.text,
										r_userScreenName:  sResult[i].retweeted_status.user.screen_name
									};
							}else{
								var weiboContent={
									userProfileImgUrl: sResult[i].user.profile_image_url,
									userScreenName:    sResult[i].user.screen_name,
									tweetText:         sResult[i].text,
									originalPic:       sResult[i].original_pic,
									thumbnailPic:      sResult[i].thumbnail_pic,
									source:            sResult[i].source,
									r_retweetedStatus: ''
								};
							}
							$('#tweetList').tmpl( weiboContent ).appendTo($(targetId));

							}//end for
						}
						var regexp = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi");
						$('.tweetText').each(function(){
							var str = $(this).text();
							$(this).html(replaceReg(regexp,str));
						});
			},{
				count:countNumber,
				screen_name: screenName
			},{
			    method: method
			});
			});
		},
		post_weibo: function(){
			WB2.anyWhere(function(W){
			W.parseCMD("/statuses/update.json", function(sResult, bStatus){
				var error_code = sResult.error;
        $('.error_message').html('');
				if( error_code ){
					switch( error_code ){
					case '40025:Error: repeated weibo text!' :
            $('.error_message').html('不能发布相同的微博');
            break
          case '40012:Error: content is null!' :
					 $('.error_message').html('微博内容为空');
            break
          }
				}else{
                var weiboContent={
                  userProfileImgUrl: sResult.user.profile_image_url,
                  userScreenName:    sResult.user.screen_name,
                  tweetText:         sResult.text,
                  source:            sResult.source
                }
          $('#postTweet').tmpl( weiboContent ).prependTo($('#homeTimeLine'));
          document.querySelector('#post_weibo_content').value = '';
				};

			},{
				status: document.querySelector('#post_weibo_content').value
			},{
			    method: "post"
			});
			});
		}
		
		
	}//end xiaoxiaoWB
	
	
	$(function(){
		xiaoxiaoWB.timeline('/statuses/home_timeline.json','#homeTimeLine','50','','post');

		$('.screen_name').live('tap', function(){
			$('#ids').empty();
			xiaoxiaoWB.timeline('/statuses/user_timeline/ids.json','#ids','100',$(this).text(),'get');
		});

		$('#post_weibo_submit').click(function(){
			xiaoxiaoWB.post_weibo();
		});
		
	});
	
	
	function replaceReg(reg,str){
	  return str.replace(reg,function(m){return '<a href="'+m+'">'+m+'</a>';})
	 }
	