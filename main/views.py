import os, time
from main import app
from flask import render_template, request
from config import FREEZER_BASE_URL
from config import SOUNDCLOUD_API,SOUNDCLOUD_NUM_TRACKS
from datetime import datetime
from datetime import timedelta
import soundcloud


def getTimestamp(time,offset):
	timestamp = datetime.strptime(time, '%Y/%m/%d %H:%M:%S +0000')
	timestamp = timestamp - timedelta(hours=offset)
	return timestamp

def formatTimestamp(timestamp):
	return datetime.strftime(timestamp,'%a %-I:%M') + datetime.strftime(timestamp,'%p').lower()

@app.route('/')
def index():
    os.environ['TZ'] = 'US/Eastern'
    time.tzset()
    offset = int(time.strftime('%z')[-3])
    page_title = 'VPR App Template'
    page_url = FREEZER_BASE_URL.rstrip('/') + request.path   
    client = soundcloud.Client(
    	client_id=SOUNDCLOUD_API['client_id'],
    	client_secret=SOUNDCLOUD_API['client_secret'],
    	username=SOUNDCLOUD_API['username'],
    	password=SOUNDCLOUD_API['password'])
    tracks = client.get('/me/tracks', order='created_at', limit=SOUNDCLOUD_NUM_TRACKS)
    playlist_tracks = []
    for track in tracks:
    	if track.streamable and 'public'==track.sharing:
    		d = {
    			'title': track.title,
				'timestamp': formatTimestamp(getTimestamp(track.created_at,offset)),
				'duration': int(round(track.duration*.001)),
				'permalink': track.permalink_url,
				'stream': track.stream_url + '?client_id='+SOUNDCLOUD_API['client_id']}
    		playlist_tracks.append(d)
    		print track.title


    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'creator': "",
        'twitter_hashtag': ""
    }

    return render_template('content.html',
    	tracks=playlist_tracks,
        page_title=page_title,
        page_url=page_url,
        social=social)
