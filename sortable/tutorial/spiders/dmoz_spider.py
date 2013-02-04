import re
from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http.request import Request
from tutorial.items import AdItem

class DmozSpider(BaseSpider):
   name = "dmoz"
#   allowed_domains = ["kitchener.kijiji.ca"]
   allowed_domains = ["ontario.kijiji.ca"]
   start_urls = [
#       "http://kitchener.kijiji.ca/f-cars-vehicles-cars-trucks-W0QQAdTypeZ1QQCatIdZ174",
#       "http://kitchener.kijiji.ca/f-cars-vehicles-cars-trucks-W0QQAdTypeZ2QQCatIdZ174",
       "http://ontario.kijiji.ca/f-cars-vehicles-cars-trucks-W0QQAdTypeZ1QQCatIdZ174",
   ]

   def parse(self, response):
       hxs = HtmlXPathSelector(response)
       requests = []
       ads = hxs.select('//table[@id="SNB_Results"]/tr')
       for ad in ads:
				 price = ad.select('td/strong/text()').extract()
				 name = ad.select('td/a/text()').extract()
				 if(len(name) == 2):
				 	name = name[1]
				 elif(len(name) == 1):
				 	name = name[0]
				 elif(len(name) == 0):
				 	continue
				 if(len(price) == 2):
				 	price = price[1]
#				 if(len(price) == 1):
#				 	price = price[0]
				 else:
				 	continue
				 url = ad.select('td/a/@href').extract()[0]
				 requests.append(Request(url, callback = self.parseAd))
       next = hxs.select('//table[@class="paginationBottomBg"]/tr/td/a/@href').extract()
       if(len(next) == 2):
       	next = next[0]
       else:
       	next = next[1]
       requests.append(Request(next))
       return requests

   def parseAd(self, response):
       requests = []
       hxs = HtmlXPathSelector(response)
       name = hxs.select('//h1[@id="preview-local-title"]/text()').extract()
       if(len(name) == 2):
       	name = name[1]
       else:
       	name = name[0]
       name = name.replace("[", "(")
       name = name.replace("]", ")")
       imageUrl = hxs.select('//img[@class="view"]/@src').extract()
       item = AdItem()
       if(len(imageUrl) == 1):
				 item['imageUrl'] = imageUrl[0]
       attributes = hxs.select('//table[@id="attributeTable"]/tr')
       item['name'] = name
       item['url'] = response.url
       for attribute in attributes:
       	attributePieces = attribute.select('td')
       	attributeName = attributePieces[0].select('text()').extract()[0]
       	attributeText = attributePieces[1].select('text()').extract()[0]
       	attributeText = attributeText.strip()
       	attributeLinkText = attributePieces[1].select('a/text()').extract()
       	if(len(attributeLinkText) > 0):
       		attributeText = attributeText + ' ' + attributeLinkText[0]
       	attributeName = attributeName.strip()
       	attributeText = attributeText.strip()
       	item[attributeName.replace(" ", "")] = attributeText
       requests.append(item)
       return requests