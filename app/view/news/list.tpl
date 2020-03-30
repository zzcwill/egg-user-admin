<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<link rel="shortcut icon" href="/favicon.ico"/>
		<meta name="viewport" content="width=1240,user-scalable=yes">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>news</title>
		<link rel="stylesheet" href="/public/css/reset.css" />
		<script src="/public/js/jquery-1.11.1.min.js"></script>
    <script src="/public/js/news.js"></script>
	</head>
	<body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a>{{ item.title }}</a>
          <div>
            {{ item.create_at }}
          </div>          
          <div>
            {{ helper.relativeTime(item.create_at) }}
          </div>          
        </li>
      {% endfor %}
    </ul>  
    <br />
    <br />
    <br />
    <br />
    <br />
    <div>
      <button type="button" id="upImage1">
        <span>上传图片</span>
      </button>
      <input type="file" name="file1" accept="image/*" class="hide" id="upImageInput1" >
    </div>
	</body>
</html>
