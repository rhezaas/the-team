"""Tests for the models of the team app."""
import pytest

from datetime import datetime
from dummyproject.utils import mixer

pytestmark = pytest.mark.django_db

class TestMember:
    def setup_method(self):
        self.member = mixer.blend("team.Member", date_joined=datetime(2020, 5, 13))

    def test_get_member_since_str(self):
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "4 years, 1 month, 3 days"

    def test_member_since_only_years(self):
        self.member.date_joined = date_joined=datetime(2021, 5, 2)
        assert self.member.get_member_since_str(date=datetime(2024, 5, 2)) == "3 years"

    def test_member_since_only_months(self):
        self.member.date_joined = date_joined=datetime(2024, 3, 16)
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "3 months"

    def test_member_since_only_days(self):
        self.member.date_joined = date_joined=datetime(2024, 6, 5)
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "11 days"

    def test_member_since_years_and_days(self):
        self.member.date_joined = datetime(2020, 6, 5)
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "4 years, 11 days"

    def test_member_since_months_and_days(self):
        self.member.date_joined = datetime(2024, 2, 10)
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "4 months, 6 days"

    def test_member_since_years_and_months(self):
        self.member.date_joined = datetime(2016, 10, 16)
        assert self.member.get_member_since_str(date=datetime(2024, 6, 16)) == "7 years, 8 months"
