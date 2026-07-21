function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    age: user.age,
    avatarInitials: user.avatarInitials,
    conditions: JSON.parse(user.conditionsJson),
    accessibility: JSON.parse(user.accessibilityJson),
  }
}

function serializePrescription(prescription) {
  return {
    id: prescription.id,
    userId: prescription.userId,
    title: prescription.title,
    doctor: prescription.doctor,
    date: prescription.date,
    instructions: prescription.instructions,
    medications: prescription.medications.map((med) => ({
      name: med.name,
      dose: med.dose,
      frequency: med.frequency,
      duration: med.duration,
    })),
  }
}

module.exports = { serializeUser, serializePrescription }
