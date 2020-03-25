<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
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
  </body>
</html>