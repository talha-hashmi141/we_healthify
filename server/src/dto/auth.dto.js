export const toUserDTO = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  clinic: user.clinicId?.name || null,
});

export const toLoginResponseDTO = (user, token) => ({
  user: toUserDTO(user),
  token,
});
