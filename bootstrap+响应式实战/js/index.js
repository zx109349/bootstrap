$(function () {
	/* 1.轮播图 */
	$(window).on('resize', () => {
		//1.窗口的宽度
		let clientW = $(window).width();
		//2.设置琳界点
		let isShowBigImage = clientW >= 900;
		//3.获取所有item
		let $allItems = $('#sz_carousels .carousel-item');
		//console.log($allItems);
		//4.遍历
		$allItems.each((index, item) => {
			//4.1取出图片的路径
			let src = isShowBigImage ? $(item).data('lg-img') : $(item).data('sm-img');
			let imgUrl = `url(${src})`;
			//4.2设置背景
			$(item).css({
				backgroundImage: imgUrl
			});
			//4.3创建img标签
			if(!isShowBigImage){//大屏幕
				let imgEle = `<img src="${src}">`;
				$(item).empty().append(imgEle);
				}else {//小屏幕
					$(item).empty();
				}
		});
	});
	$(window).trigger('resize');
	
	//3.添加轮播图的滑动
	let startX = 0, endX = 0;
	let carouselInner = $('#sz_carousels .carousel-inner')[0];
	let $carousel = $('#sz_carousels');
	let carousel = $carousel[0];
	
	carouselInner.addEventListener('touchstart', (e) => {
		startX = e.targetTouches[0].clientX;
		console.log(startX);
	});
	carouselInner.addEventListener('touchmove', (e) => {
		endX = e.targetTouches[0].clientX;
		if(endX - startX > 0) {//上一张
			$carousel.carousel('prev');
		}else if (endX - startX < 0) {//下一张
			$carousel.carousel('next');
		}
	});
	//4超出内容的处理
	
	
	$(window).on('resize',()=> {
		let $ul = $('#sz_product .nav');
		let $allLis = $('.nav-item', $ul);
		let totalW = 0;//所有li的宽度
		$allLis.each((index, item)=>{
			totalW += $(item).width();
		});
		//获取父标签的宽度
		let parentW = $ul.parent().width();
		if(totalW > parentW){
			$ul.css({
				width:totalW + 'px'
			})
		}else {
			$ul.removeAttr('style');
		}
		
	}).trigger('resize');
	//2.工具的提示
	$('[data-toggle="tooltip"]').tooltip();
});