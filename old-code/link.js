var Link = {
    Room_W58S17: {
        
        run: function() {
            let source = Game.getObjectById('59d4e06488676c7391f502c6');
            if (source.cooldown == 0 && source.energy > 0) {
                source.transferEnergy(Game.getObjectById('59d4271e3957200907fedc9a'), source.enrgy);
            }
        }
    }
}

module.exports = Link;