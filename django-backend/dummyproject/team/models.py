"""Models for the team app."""

from django.db import models

from datetime import datetime
from dateutil.relativedelta import relativedelta


class Member(models.Model):
    """
    A member of the team.

    :name: String representing the name of the member.
    :image: Filename of the image of the member.
    :date_joined: The date when the member joined the team.
    :bio: String representing a mini-bio of the member.

    """
    name = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)
    date_joined = models.DateField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    def __str__(self):  # pragma: nocover
        # too trivial to test
        return self.name

    def get_member_since_str(self, *, date = None):
        member_since_str    = []
        delta               = relativedelta(date if date else datetime.now(), self.date_joined)

        if delta.years:
            member_since_str.append(f"{delta.years} {"year" if delta.years == 1 else "years"}")

        if delta.months:
            member_since_str.append(f"{delta.months} {"month" if delta.months == 1 else "months"}")

        if delta.days:
            member_since_str.append(f"{delta.days} {"day" if delta.days == 1 else "days"}")

        return ", ".join(member_since_str)