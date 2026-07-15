// Curated real photography (Unsplash) depicting Indian students, mentors and
// parents, used in place of generic/western stock photos and cartoon avatars
// across every dashboard.

function img(id: string, w = 200) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const STUDENT_PHOTOS = [
  "photo-1598096969068-7f52cac10c83", // young man, backpack
  "photo-1604177091072-b7b677a077f6", // young man with laptop
  "photo-1522661067900-ab829854a57f", // schoolgirl at chalkboard
  "photo-1517487313006-d80558d7a5cb", // young woman, smiling
  "photo-1667655861998-46fe4c29a4cf", // schoolgirl in uniform
];

export const MENTOR_PHOTOS = [
  "photo-1489451058181-433dc9ffa757", // young man, glasses
  "photo-1727773498819-9b5476a70594", // man with tablet
  "photo-1528082414335-adbd64f18d12", // woman, smiling
];

export const PARENT_PHOTOS = [
  "photo-1531339413195-cc6c17163974", // father portrait
  "photo-1589169011402-8b2cbd1ee593", // mother with daughter
];

export function studentAvatar(seed: number, w = 200) {
  return img(STUDENT_PHOTOS[seed % STUDENT_PHOTOS.length], w);
}

export function mentorAvatar(seed: number, w = 200) {
  return img(MENTOR_PHOTOS[seed % MENTOR_PHOTOS.length], w);
}

export function parentAvatar(seed: number, w = 200) {
  return img(PARENT_PHOTOS[seed % PARENT_PHOTOS.length], w);
}

// Wider decorative/banner scenes for hero sections
export const BANNER_PHOTOS = {
  student: img("photo-1604177091072-b7b677a077f6", 400),
  mentor: img("photo-1709290749293-c6152a187b14", 400), // teacher at blackboard with class
  parentFamily: img("photo-1567122087721-47b09b61e1d1", 400),
};

export function getRoleAvatar(role: string, w = 120) {
  // Student 0 is the canonical demo learner (front-facing) — the same photo is
  // used for the sidebar/topbar, profile, and dashboard hero so they all match.
  if (role === "student") return studentAvatar(0, w);
  if (role === "parent") return parentAvatar(0, w);
  if (role === "mentor") return mentorAvatar(0, w);
  return mentorAvatar(1, w); // admin / super admin default
}
