from mixer.backend.django import GenFactory, Mixer

class MyMixer(Mixer):
    next_id = 1

    def blend(self, *args, **kwargs):
        if "id" not in kwargs:
            kwargs["id"] = MyMixer.next_id
            MyMixer.next_id += 1
        return super().blend(*args, **kwargs)


mixer = MyMixer(factory=GenFactory)