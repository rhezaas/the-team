"""Views for the team app."""
from django.http import JsonResponse
from django.forms.models import model_to_dict

from . import models


def team_list_view(request):
    qs = models.Member.objects.all()
    data = []
    for member in qs:
        member_dict = model_to_dict(member)
        member_dict['member_since_str'] = member.get_member_since_str()
        member_dict['image'] = member.image.name
        data.append(member_dict)
    return JsonResponse({'data': data})