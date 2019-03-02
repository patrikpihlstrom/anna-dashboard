import re
import json
import hashlib

from django.http import HttpResponse
from django.template import loader

from basicauth.decorators import basic_auth_required

from .anna_client.client import Client


@basic_auth_required
def index(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render({}, request))


@basic_auth_required
def search(request):
	client = Client()
	client.authenticate(True)
	query = {}
	for key, val in dict(request.GET).items():
		query[str(key).replace('[]', '')] = val
	response = client.query(query)
	response_hash = hashlib.sha256(bytes(str(response).encode())).hexdigest()
	if 'hash' in query and len(query['hash']) > 0 and query['hash'][0] == response_hash:
		return HttpResponse()

	del query['hash']
	jobs = []
	for job in response:
		jobs.append({
			'tag': job['container'], 'driver': job['driver'], 'site': job['site'], 'status': job['status'],
			'log': job['log'][-int(job['log'].find(' ')):],
			'updated_at': re.sub(r'.*, ', '', job['updated_at'].rstrip(' GMT'))})
	return HttpResponse(json.dumps({'jobs': jobs, 'hash': response_hash}), content_type='application/json')
