# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/topics/items.html

from scrapy.item import Item, Field

class AdItem(Item):
	name = Field()
	url = Field()
	imageUrl = Field()
	DateListed = Field()
	LastEdited = Field()
	Price = Field()
	Address = Field()
	ForSaleBy = Field()
	Make = Field()
	Model = Field()
	Year = Field()
	Trim = Field()
	Kilometers = Field()
	BodyType = Field()
	Transmission = Field()
	Colour = Field()
	FuelType = Field()
	Drivetrain = Field()
	Type = Field()
	Stock = Field()
	Location = Field()