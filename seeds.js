var mongoose = require("mongoose");
var Castle = require("./models/castle");
var Comment = require("./models/comment");

var data = [
    {
        name: 'Золочівський замок',
        image: 'http://4.bp.blogspot.com/-tmXYg__lKHo/U0qIf2iDuOI/AAAAAAAAADE/ZQStaWKJHZQ/s1600/IMG_2940.JPG',
        description: 'Замок було зведено на кошти Якуба Собеського (батько короля Речі Посполитої Яна III Собеського) у 1634 році як оборонну фортецю за проектом невідомого італійського архітектора на місці старого дерев\'яного замку, який оточували потужні земляні вали, обкладені каменем, з бастіонами на кутах та ровами з водою. У дворі замку є два палаци. Більший з них має назву Великого палацу, а навпроти в\'їзної вежі розташований Китайський палац. Цікавим також замок є тим, що тут була перша система каналізації, яка збереглася до наших днів.'
    },
    {
        name: 'Camp',
        image: 'https://farm9.staticflickr.com/8486/8240036928_1a31fbbe9e.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis elit sed nibh sollicitudin, vel varius ligula posuere. Phasellus lectus ante, faucibus eget ligula sed, dictum condimentum dui. Quisque vel volutpat justo. Etiam consectetur ullamcorper tellus et porttitor. Proin at nunc ultrices, commodo lorem eu, luctus ipsum. Proin vel enim purus. Phasellus et justo at libero convallis cursus. Maecenas ullamcorper turpis vehicula faucibus sagittis. Aenean sollicitudin lorem nibh. Phasellus velit massa, tincidunt in libero vitae, malesuada malesuada magna. Vestibulum ut pharetra mauris, eget vulputate leo. Donec sit amet ante mauris. In id leo mauris.'
    },
    {
        name: 'Camping',
        image: 'https://farm8.staticflickr.com/7113/7482049174_560bf194ec.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis elit sed nibh sollicitudin, vel varius ligula posuere. Phasellus lectus ante, faucibus eget ligula sed, dictum condimentum dui. Quisque vel volutpat justo. Etiam consectetur ullamcorper tellus et porttitor. Proin at nunc ultrices, commodo lorem eu, luctus ipsum. Proin vel enim purus. Phasellus et justo at libero convallis cursus. Maecenas ullamcorper turpis vehicula faucibus sagittis. Aenean sollicitudin lorem nibh. Phasellus velit massa, tincidunt in libero vitae, malesuada malesuada magna. Vestibulum ut pharetra mauris, eget vulputate leo. Donec sit amet ante mauris. In id leo mauris.'
    }
]

function seedDB() {
    //Remove all castles
    Castle.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Removed castles!');
            //add a few castles
            data.forEach(function(seed) {
                Castle.create(seed, function(err, castle) {
                    if(err) {
                    console.log(err);
                    } else {
                        console.log('Castle added');
                        Comment.create(
                            {
                                text: 'Nice place but I wish there was internet',
                                author: 'Homer'
                            }, 
                            function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    castle.comments.push(comment);
                                    castle.save();
                                    console.log('Created new comment');
                                }                       
                        })
                    }
                });
            });
        }
    }); 
    
    
    
    //add a few comments
}

module.exports = seedDB;