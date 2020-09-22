require('geckodriver');
let webdriver = require('selenium-webdriver');
let By = require('selenium-webdriver').By;
let until = require('selenium-webdriver').until;
let driver = new webdriver.Builder().forBrowser('firefox').build();
let chai = require('chai');
let expect = chai.expect;
let fs = require('fs');

describe('IMDb Test Case', function () {
    it('Open imdb.com', function (done) {
        driver.get('https://www.imdb.com').then(() => {
            driver.wait(until.elementLocated(By.id("suggestion-search")), 10000).then(() => {
                done();
            });
        });
    });
    it('Search for "game of thrones"', function (done) {
        driver.findElement(By.id("suggestion-search")).sendKeys("game of thrones", webdriver.Key.ENTER).then(() => {
            done();
        });
    });
    it('Find and open Video Game related search results', function (done) {
        driver.wait(until.elementLocated(By.linkText("Video Game")), 10000).click().then(() => {
            done();
        });
    });

    it('Verify correct page is opened', function (done) {
        driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Video Game Titles')]")), 10000).then(() => {
            driver.getCurrentUrl().then((url) => {
                expect(url).to.have.string('ttype=vg');
                done();
            });
        });
    });

    it('Take a screenshot', function (done) {
        driver.takeScreenshot().then(function(data) {
            fs.writeFileSync('image.png', data, 'base64');
            done();
        });
    });
    after(function () {
        driver.quit();
    });
});