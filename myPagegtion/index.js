;(function($,CreatPager){
	var CreatPager = function (options){
		//参数设置
		var options = $.extend({
			pageId:        'pager',  //插入分页的容器的ID
			currentPage:   1,//当前页码
			totalPages:    20,//总共多少页
			showPages:     7,//页面显示多少页
			contentId:     'text',//内容容器
			showContents:  4//每页显示内容条数
		},options);

		this.pageId = options.pageId;
		this.contentId = options.contentId;
		this.currentPage = options.currentPage;
		this.showPages = options.showPages;
		this.showContents = options.showContents;
		this.totalPages = Math.ceil($('#'+this.contentId).find('li').length / this.showContents);

		//页码区间
		this.ragion = Math.floor( parseInt(this.showPages) / 2 );
		//开始页码
		this.beginPage = 0;
		//结束页码
		this.endPage = 0;
	}
	CreatPager.prototype = {
		//初始化
		init:function(){
			this.creatPageDom();
			this.currentHigh(this.currentPage-this.beginPage);
			this.gotoPage();
		},
		//创建分页
		creatPageDom:function(){
			this.beginPage = this.currentPage - this.ragion;
			this.beginPage = this.beginPage < 1 ? 1 : this.beginPage;

			if(this.totalPages<this.showPages){
				this.showPages = this.totalPages;
			}
			//末尾页码
			this.endPage = this.beginPage + this.showPages -1;
			if(this.endPage >= this.totalPages){
				this.endPage = this.totalPages;
				this.beginPage = this.endPage - this.showPages + 1;
				this.beginPage = this.beginPage < 1 ? 1 : this.beginPage;
			};

			var $pager = $('#'+this.pageId);
			//插入“首页”
			var $firstPager = $('<div class="pageFirst"><a href="javascript:void(0);">首页</a></div>');
			$pager.append($firstPager);
			//插入“上一页”
			var $prePage = $('<div class="pagePre"><a href="javascript:void(0);">上一页</a></div>');
			$pager.append($prePage);
			//插入页码
			for(var i=this.beginPage;i<=this.endPage;i++){
				var $pages = $('<div class="pagenation"><a href="javascript:void(0);">'+i+'</a></div>');
				$pager.append($pages);
			};
			//插入“下一页”
			var $nextPage = $('<div class="pageNext"><a href="javascript:void(0);">下一页 </a></div>');
			$pager.append($nextPage);
			//插入“尾页”
			var $lastPager = $('<div class="pageLast"><a href="javascript:void(0);">尾页</a></div>');
			$pager.append($lastPager);


			//点击首页
			var _this = this;
			$firstPager.click(function(){
				if(_this.currentPage !== 1){
					_this.currentPage = 1;
					_this.gotoPage();
				}
			});
			//点击尾页
			$lastPager.click(function(){
				if(_this.currentPage !== _this.totalPages){
					_this.currentPage = _this.totalPages;
					_this.gotoPage();
				}
			});
			//点击上一页
			$prePage.click(function(){
				if(_this.currentPage !== 1){
					_this.currentPage--;
					_this.gotoPage();
				}
			})
			//点击下一页
			$nextPage.click(function(){
				if(_this.currentPage !== _this.totalPages){
					_this.currentPage++;
					_this.gotoPage();
				}
			})
			//点击某一页
			$('.pagenation').click(function(){
				if($(this).find('a').html() !== _this.currentPage){
					_this.currentPage = $(this).find('a').html();
					_this.gotoPage();
				}
			})

		},
		//销毁分页
		destoryPager:function(){
			$('#'+this.pageId).html('');
		},
		//高亮显示当前页
		currentHigh:function(current){
			$('.pagenation').eq(current).addClass('active');
		},
		//调到某一页
		gotoPage:function(){
			this.destoryPager();
			this.currentPage=this.currentPage<1?1:this.currentPage;
			this.currentPage=this.currentPage>this.totalPages?this.totalPages:this.currentPage;
			this.creatPageDom();
			this.currentHigh(this.currentPage-this.beginPage);
			this.appendContent();
		},
		//添加内容
		appendContent:function(){
			var _this = this;
			$('#'+this.contentId).find('li').each(function(i){
				if(i>=(_this.currentPage-1)*_this.showContents && i<_this.currentPage*_this.showContents){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
		}
		
	}
	//暴露到全局
	window.CreatPager = CreatPager;

})(jQuery,window.CreatPager || {});
//假如这是另一个同事提交的代码


