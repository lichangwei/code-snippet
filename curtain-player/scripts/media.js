(function(){

'use strict';

var list = document.getElementById('list');

var _audio = document.getElementById('bgaudio');
_audio.addEventListener('ended', paly, false);

var videos = [];

window.audio = {
    play: function(){
        _audio.play();
    },
    pause: function(){
        _audio.pause();
    }
}
window.video = {
    status: null,
    index: -1,
    play: function( index ){
        this._play(index);
        this.status = 'front';
    },
    playInBackground: function(index){
        this._play(index);
        this.status = 'back';
    },
    _play: function(index){
        if(!videos[index]){
            videos[index] = document.createElement('video');
            videos[index].src = 'video/' + (index+1) + '.f4v';
            videos[index].addEventListener('ended', paly, false);
        }
        this.index = index;
        var _video = videos[index];
        document.body.insertBefore(_video, list);
        _video.play();
        _audio.pause();
    },
    pause: function(){
        if(this.index === -1) return;
        var _video = videos[this.index];
        document.body.removeChild(_video);
        this.index = -1;
        _video.pause();
        _audio.play();
        this.status = null;
    }
}

function paly(){
    return this.play();
}

})();
