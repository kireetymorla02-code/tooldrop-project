/**
 * Demo AI recommendation engine — scores centers by distance, rating, load, price, ETA.
 */
export function scoreCenter(center, userLocation) {
  const distanceScore = Math.max(0, 100 - center.distanceKm * 8);
  const ratingScore = center.rating * 18;
  const loadScore = Math.max(0, 100 - center.currentLoad * 12);
  const priceScore = Math.max(0, 100 - center.priceIndex * 10);
  const etaScore = Math.max(0, 100 - center.etaHours * 4);

  const total =
    distanceScore * 0.28 +
    ratingScore * 0.3 +
    loadScore * 0.15 +
    priceScore * 0.12 +
    etaScore * 0.15;

  return Math.round(total * 10) / 10;
}

export function buildAiExplanation(center) {
  return `Recommended because it is ${center.distance} away, has a ${center.rating} rating (${center.reviews} reviews), ${center.currentLoad < 0.5 ? "low workload" : "moderate workload"}, and can complete service within ${center.etaHours} hours.`;
}

export function rankCenters(centers) {
  return [...centers]
    .map((c) => ({
      ...c,
      aiScore: scoreCenter(c),
      aiExplanation: buildAiExplanation(c),
    }))
    .sort((a, b) => b.aiScore - a.aiScore);
}

export function getAiRecommendations(centers, limit = 3) {
  return rankCenters(centers).slice(0, limit);
}
