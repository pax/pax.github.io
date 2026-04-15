import { useState, useEffect, useRef } from "react";

const exercises = [
  {
    id: "quad-sets",
    name: "Quad Sets",
    phase: 2,
    sets: "3 × 15 reps",
    freq: "1× daily",
    tip: "Press knee firmly into the floor. You should see your kneecap move upward.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.75;
      // Person sitting with leg extended
      const torsoAngle = -0.3;
      const hipX = cx - 40, hipY = ground - 10;
      const shoulderX = hipX + Math.sin(torsoAngle) * 80, shoulderY = hipY - Math.cos(torsoAngle) * 80;
      const headX = shoulderX + Math.sin(torsoAngle) * 25, headY = shoulderY - 25;
      
      // Quad tightening animation
      const cycle = (Math.sin(t * 2) + 1) / 2;
      const kneePress = cycle * 3;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Arms behind for support
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      const elbowX = hipX - 30, elbowY = hipY - 30;
      const handX = hipX - 45, handY = ground - 5;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(handX, handY);
      ctx.stroke();
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(shoulderX, shoulderY);
      ctx.stroke();
      
      // Leg extended on ground
      const kneeX = hipX + 55, kneeY = ground - 5 - kneePress;
      const ankleX = kneeX + 60, ankleY = ground - 3;
      const footX = ankleX + 15, footY = ankleY - 5;
      
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(footX, footY);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Quad muscle highlight
      if (cycle > 0.3) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${cycle * 0.7})`;
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(hipX + 15, hipY + 2);
        ctx.lineTo(kneeX - 5, kneeY + 2);
        ctx.stroke();
      }
      
      // Arrow showing press direction
      if (cycle > 0.5) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${(cycle - 0.5) * 2})`;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 2;
        const arrowX = kneeX, arrowY = kneeY + 12;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX, arrowY + 12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(arrowX - 5, arrowY + 8);
        ctx.lineTo(arrowX, arrowY + 14);
        ctx.lineTo(arrowX + 5, arrowY + 8);
        ctx.fill();
      }
    }
  },
  {
    id: "heel-slides",
    name: "Heel Slides",
    phase: 2,
    sets: "3 × 15 reps",
    freq: "1× daily",
    tip: "Slide slowly and hold at end range for 5 seconds.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.75;
      const cycle = (Math.sin(t * 1.5) + 1) / 2;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Person lying on back
      const headX = cx - 80, headY = ground - 18;
      const shoulderX = cx - 55, shoulderY = ground - 8;
      const hipX = cx + 10, hipY = ground - 5;
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.stroke();
      
      // Arms at sides
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(shoulderX + 5, ground - 3);
      ctx.stroke();
      
      // Sliding leg
      const kneeBend = cycle * 1.1;
      const thighLen = 55, shinLen = 50;
      const kneeX = hipX + Math.cos(kneeBend + 0.1) * thighLen;
      const kneeY = hipY - Math.sin(kneeBend + 0.1) * thighLen;
      const ankleX = kneeX + Math.cos(kneeBend * 0.8) * shinLen;
      const ankleY = Math.min(kneeY + Math.sin(kneeBend * 0.5) * shinLen, ground - 3);
      
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 12, ankleY - 3);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Movement arrow
      ctx.strokeStyle = "rgba(255, 140, 60, 0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(hipX + 65, ground + 10);
      ctx.lineTo(hipX + 25, ground + 10);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255, 140, 60, 0.6)";
      ctx.beginPath();
      ctx.moveTo(hipX + 28, ground + 6);
      ctx.lineTo(hipX + 22, ground + 10);
      ctx.lineTo(hipX + 28, ground + 14);
      ctx.fill();
    }
  },
  {
    id: "slr",
    name: "Straight Leg Raises",
    phase: 2,
    sets: "3 × 12 each direction",
    freq: "1× daily",
    tip: "Tighten the quad first, then lift. Keep the knee locked straight.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.75;
      const liftAngle = Math.max(0, Math.sin(t * 1.8)) * 0.55;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Person lying on back
      const headX = cx - 80, headY = ground - 18;
      const shoulderX = cx - 55, shoulderY = ground - 8;
      const hipX = cx + 10, hipY = ground - 5;
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.stroke();
      
      // Stationary leg
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#b0a898";
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(hipX + 95, ground - 3);
      ctx.stroke();
      
      // Lifting leg
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      const legLen = 100;
      const ankleX = hipX + Math.cos(liftAngle) * legLen;
      const ankleY = hipY - Math.sin(liftAngle) * legLen;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 10, ankleY - 8);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Lift arc indicator
      if (liftAngle > 0.1) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${liftAngle})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(hipX, hipY, 35, 0, -liftAngle, true);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  },
  {
    id: "wall-sits",
    name: "Wall Sits",
    phase: 2,
    sets: "3 × 20–30 sec",
    freq: "1× daily",
    tip: "Start shallow (~30°). Keep back flat against wall, weight through heels.",
    animate: (ctx, t, w, h) => {
      const ground = h * 0.78;
      const wallX = w / 2 - 30;
      
      // Subtle breathing motion
      const breathe = Math.sin(t * 2) * 1.5;
      
      // Wall
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(wallX, ground - 150);
      ctx.lineTo(wallX, ground);
      ctx.stroke();
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Person in wall sit
      const backX = wallX + 3;
      const hipY = ground - 50 + breathe;
      const shoulderY = hipY - 65;
      const headY = shoulderY - 28;
      const kneeX = backX + 55, kneeY = hipY + 5;
      const ankleX = kneeX + 5, ankleY = ground - 3;
      
      // Back against wall
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(backX, hipY);
      ctx.lineTo(backX, shoulderY);
      ctx.stroke();
      
      // Thigh
      ctx.beginPath();
      ctx.moveTo(backX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();
      
      // Shin
      ctx.beginPath();
      ctx.moveTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 18, ankleY);
      ctx.stroke();
      
      // Arms hanging
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(backX + 5, shoulderY + 5);
      ctx.lineTo(backX + 15, hipY - 5);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(backX + 5, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Angle indicator
      ctx.strokeStyle = "rgba(255, 140, 60, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(kneeX, kneeY, 20, Math.PI * 0.5, Math.PI * 1.1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255, 140, 60, 0.7)";
      ctx.font = "11px monospace";
      ctx.fillText("~30°", kneeX - 35, kneeY + 5);
    }
  },
  {
    id: "glute-bridges",
    name: "Glute Bridges",
    phase: 2,
    sets: "3 × 15 reps",
    freq: "1× daily",
    tip: "Squeeze glutes at top. Hold 3 seconds. Don't hyperextend the back.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.78;
      const lift = Math.max(0, Math.sin(t * 1.6)) * 30;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      const shoulderX = cx - 50, shoulderY = ground - 8;
      const hipX = cx + 5, hipY = ground - 8 - lift;
      const kneeX = cx + 45, kneeY = ground - 45 - lift * 0.3;
      const ankleX = cx + 50, ankleY = ground - 3;
      const headX = cx - 80, headY = ground - 16;
      
      // Torso (arching up)
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.quadraticCurveTo(cx - 20, shoulderY - lift * 0.6, hipX, hipY);
      ctx.stroke();
      
      // Thigh
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();
      
      // Shin
      ctx.beginPath();
      ctx.moveTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 15, ankleY);
      ctx.stroke();
      
      // Arms at sides
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(shoulderX + 5, shoulderY);
      ctx.lineTo(shoulderX - 10, ground - 3);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Glute highlight
      if (lift > 15) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${(lift - 15) / 30})`;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(hipX - 5, hipY + 5, 10, 0, Math.PI);
        ctx.stroke();
      }
      
      // Up arrow
      if (lift > 5) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${lift / 40})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hipX, hipY + 20);
        ctx.lineTo(hipX, hipY - 5);
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(hipX - 5, hipY);
        ctx.lineTo(hipX, hipY - 8);
        ctx.lineTo(hipX + 5, hipY);
        ctx.fill();
      }
    }
  },
  {
    id: "clamshells",
    name: "Clamshells",
    phase: 2,
    sets: "3 × 15 each side",
    freq: "1× daily",
    tip: "Keep feet together. Only the knee opens. Slow and controlled.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.75;
      const openAngle = Math.max(0, Math.sin(t * 1.8)) * 0.6;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Side-lying person (viewed from front-ish)
      const hipX = cx, hipY = ground - 25;
      const shoulderX = cx, shoulderY = ground - 80;
      const headX = cx, headY = ground - 108;
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(shoulderX, shoulderY);
      ctx.stroke();
      
      // Bottom leg (stationary, bent)
      const bKneeX = hipX + 40, bKneeY = hipY + 10;
      const bAnkleX = bKneeX - 10, bAnkleY = hipY + 45;
      ctx.strokeStyle = "#b0a898";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(bKneeX, bKneeY);
      ctx.lineTo(bAnkleX, bAnkleY);
      ctx.stroke();
      
      // Top leg (opening)
      const tKneeX = hipX + 40 * Math.cos(openAngle), tKneeY = hipY - 40 * Math.sin(openAngle) + 5;
      const tAnkleX = bAnkleX, tAnkleY = bAnkleY - 5; // feet stay together
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY - 3);
      ctx.lineTo(tKneeX, tKneeY);
      ctx.lineTo(tAnkleX, tAnkleY);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Arm
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(shoulderX + 20, shoulderY + 25);
      ctx.stroke();
      
      // Opening arc
      if (openAngle > 0.1) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${openAngle})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(hipX, hipY, 25, -0.1, -openAngle, true);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    phase: 2,
    sets: "3 × 15 reps",
    freq: "1× daily",
    tip: "3 seconds up, 3 seconds down. Both feet. Hold at the top.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.82;
      const rise = Math.max(0, Math.sin(t * 1.4)) * 18;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      const ankleY = ground - 5 - rise;
      const kneeY = ankleY - 55;
      const hipY = kneeY - 55;
      const shoulderY = hipY - 65;
      const headY = shoulderY - 28;
      
      // Body (standing)
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      
      // Legs
      ctx.beginPath();
      ctx.moveTo(cx - 8, ankleY);
      ctx.lineTo(cx - 5, kneeY);
      ctx.lineTo(cx, hipY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 8, ankleY);
      ctx.lineTo(cx + 5, kneeY);
      ctx.lineTo(cx, hipY);
      ctx.stroke();
      
      // Torso
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx, shoulderY);
      ctx.stroke();
      
      // Arms
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, shoulderY);
      ctx.lineTo(cx - 18, hipY + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, shoulderY);
      ctx.lineTo(cx + 18, hipY + 10);
      ctx.stroke();
      
      // Feet (on toes when raised)
      ctx.lineWidth = 4;
      if (rise > 5) {
        // On toes
        ctx.beginPath();
        ctx.moveTo(cx - 8, ankleY);
        ctx.lineTo(cx - 10, ground - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 8, ankleY);
        ctx.lineTo(cx + 10, ground - 2);
        ctx.stroke();
      } else {
        // Flat
        ctx.beginPath();
        ctx.moveTo(cx - 8, ankleY);
        ctx.lineTo(cx - 20, ground - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 8, ankleY);
        ctx.lineTo(cx + 20, ground - 2);
        ctx.stroke();
      }
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(cx, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Calf highlight
      if (rise > 8) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${(rise - 8) / 15})`;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(cx - 5, kneeY + 15);
        ctx.lineTo(cx - 7, ankleY - 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 5, kneeY + 15);
        ctx.lineTo(cx + 7, ankleY - 5);
        ctx.stroke();
      }
      
      // Up arrow
      ctx.strokeStyle = `rgba(255, 140, 60, ${rise / 25})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + 35, ground - 5);
      ctx.lineTo(cx + 35, ground - 25 - rise);
      ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(cx + 30, ground - 20 - rise);
      ctx.lineTo(cx + 35, ground - 28 - rise);
      ctx.lineTo(cx + 40, ground - 20 - rise);
      ctx.fill();
    }
  },
  {
    id: "hamstring-curls",
    name: "Prone Hamstring Curls",
    phase: 2,
    sets: "3 × 12 reps",
    freq: "1× daily",
    tip: "Lie face down. Curl slowly against gravity. Add ankle weight to progress.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.7;
      const curl = Math.max(0, Math.sin(t * 1.6)) * 1.2;
      
      // Bench/ground
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 110, ground);
      ctx.lineTo(cx + 80, ground);
      ctx.stroke();
      
      // Person lying face down
      const headX = cx - 85, headY = ground - 16;
      const shoulderX = cx - 60, shoulderY = ground - 8;
      const hipX = cx + 10, hipY = ground - 5;
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.stroke();
      
      // Stationary leg
      ctx.strokeStyle = "#b0a898";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(hipX + 90, ground - 3);
      ctx.stroke();
      
      // Curling leg
      const kneeX = hipX + 55, kneeY = ground - 4;
      const shinLen = 45;
      const ankleX = kneeX - Math.sin(curl) * shinLen;
      const ankleY = kneeY - Math.cos(curl) * shinLen;
      
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      const footAngle = curl + 0.3;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX - Math.sin(footAngle) * 12, ankleY - Math.cos(footAngle) * 12);
      ctx.stroke();
      
      // Arms folded under head
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(headX + 10, headY + 5);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Hamstring highlight
      if (curl > 0.3) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${curl / 1.5})`;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(hipX + 10, hipY + 2);
        ctx.lineTo(kneeX - 5, kneeY);
        ctx.stroke();
      }
    }
  },
  {
    id: "single-leg-balance",
    name: "Single-Leg Balance",
    phase: 3,
    sets: "3 × 30 sec",
    freq: "1× daily",
    tip: "Start eyes open. Progress to eyes closed, then a soft surface (pillow).",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.82;
      
      // Subtle sway
      const sway = Math.sin(t * 2.5) * 3;
      const armSway = Math.sin(t * 3) * 8;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      const ankleX = cx + sway, ankleY = ground - 5;
      const kneeY = ankleY - 55;
      const hipY = kneeY - 55;
      const shoulderY = hipY - 65;
      const headY = shoulderY - 28;
      
      // Standing leg
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + sway * 0.3, kneeY);
      ctx.lineTo(cx + sway * 0.5, hipY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 18, ground - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX - 8, ground - 2);
      ctx.stroke();
      
      // Raised leg (bent)
      const rKneeX = cx + sway * 0.5 + 25, rKneeY = hipY + 20;
      const rAnkleX = rKneeX - 5, rAnkleY = rKneeY + 30;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx + sway * 0.5, hipY);
      ctx.lineTo(rKneeX, rKneeY);
      ctx.lineTo(rAnkleX, rAnkleY);
      ctx.stroke();
      
      // Torso
      ctx.beginPath();
      ctx.moveTo(cx + sway * 0.5, hipY);
      ctx.lineTo(cx + sway * 0.7, shoulderY);
      ctx.stroke();
      
      // Arms out for balance
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx + sway * 0.7, shoulderY);
      ctx.lineTo(cx - 35 + armSway, shoulderY + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + sway * 0.7, shoulderY);
      ctx.lineTo(cx + 35 - armSway, shoulderY + 5);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(cx + sway * 0.8, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Balance indicator
      ctx.strokeStyle = "rgba(255, 140, 60, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, ground + 12);
      ctx.lineTo(cx, ground - 180);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  },
  {
    id: "terminal-knee-ext",
    name: "Terminal Knee Extensions",
    phase: 3,
    sets: "3 × 15 reps",
    freq: "1× daily",
    tip: "Band behind knee. Straighten from ~30° to full. Squeeze quad at end.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, ground = h * 0.82;
      const ext = (Math.sin(t * 1.8) + 1) / 2;
      const kneeBend = 0.5 - ext * 0.5;
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Anchor point for band
      const anchorX = cx - 60, anchorY = ground - 55;
      
      const hipY = ground - 120;
      const kneeX = cx, kneeY = ground - 55;
      const shinLen = 50;
      const ankleX = kneeX + Math.sin(kneeBend) * shinLen;
      const ankleY = kneeY + Math.cos(kneeBend) * shinLen;
      
      // Resistance band
      ctx.strokeStyle = "rgba(255, 80, 80, 0.6)";
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(anchorX, anchorY);
      ctx.lineTo(kneeX - 3, kneeY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Standing leg (back leg, slightly behind)
      ctx.strokeStyle = "#b0a898";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 10, hipY);
      ctx.lineTo(cx - 15, kneeY);
      ctx.lineTo(cx - 18, ground - 3);
      ctx.stroke();
      
      // Working leg
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 15, ankleY);
      ctx.stroke();
      
      // Torso
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx, hipY - 65);
      ctx.stroke();
      
      // Arms
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, hipY - 60);
      ctx.lineTo(cx - 15, hipY - 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, hipY - 60);
      ctx.lineTo(cx + 15, hipY - 30);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(cx, hipY - 85, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Quad highlight at full extension
      if (ext > 0.6) {
        ctx.strokeStyle = `rgba(255, 140, 60, ${(ext - 0.6) * 2})`;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(cx + 3, hipY + 10);
        ctx.lineTo(kneeX + 2, kneeY - 5);
        ctx.stroke();
      }
    }
  },
  {
    id: "step-ups",
    name: "Step-Ups",
    phase: 3,
    sets: "3 × 10 each leg",
    freq: "1× daily",
    tip: "Use a low platform (15–20 cm). Push through the heel. Control the descent.",
    animate: (ctx, t, w, h) => {
      const ground = h * 0.82;
      const cx = w / 2;
      const cycle = (t * 0.8) % (Math.PI * 2);
      const phase = cycle / (Math.PI * 2); // 0 to 1
      
      // Ground
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, ground);
      ctx.lineTo(w - 20, ground);
      ctx.stroke();
      
      // Step platform
      const stepH = 25, stepW = 50;
      const stepX = cx - 10;
      ctx.fillStyle = "#444";
      ctx.fillRect(stepX - stepW / 2, ground - stepH, stepW, stepH);
      
      // Animate stepping up and down
      let bodyY, frontFootY, backFootY, kneeAngle;
      if (phase < 0.4) {
        // Going up
        const p = phase / 0.4;
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        bodyY = ground - stepH - ease * 80;
        frontFootY = ground - stepH - 2;
        backFootY = ground - 2 - ease * (stepH);
      } else if (phase < 0.5) {
        // Hold at top
        bodyY = ground - stepH - 80;
        frontFootY = ground - stepH - 2;
        backFootY = ground - stepH - 2;
      } else if (phase < 0.9) {
        // Coming down
        const p = (phase - 0.5) / 0.4;
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        bodyY = ground - stepH - 80 + ease * 80;
        frontFootY = ground - stepH - 2;
        backFootY = ground - stepH - 2 + ease * stepH;
      } else {
        bodyY = ground - 80;
        frontFootY = ground - stepH - 2;
        backFootY = ground - 2;
      }
      
      const hipY = bodyY + 35;
      const shoulderY = bodyY - 30;
      const headY = shoulderY - 28;
      
      // Front leg (on step)
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx - 3, (hipY + frontFootY) / 2);
      ctx.lineTo(cx - 5, frontFootY);
      ctx.stroke();
      
      // Back leg
      ctx.strokeStyle = "#b0a898";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx + 10, (hipY + backFootY) / 2 + 5);
      ctx.lineTo(cx + 12, backFootY);
      ctx.stroke();
      
      // Torso
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx, shoulderY);
      ctx.stroke();
      
      // Arms
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, shoulderY);
      ctx.lineTo(cx - 18, shoulderY + 35);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, shoulderY);
      ctx.lineTo(cx + 18, shoulderY + 35);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(cx, headY, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    id: "prone-hang",
    name: "Prone Hang (Extension)",
    phase: "Keep daily",
    sets: "3 × 3 min holds",
    freq: "1× daily",
    tip: "Critical for maintaining full extension before surgery. Let gravity do the work.",
    animate: (ctx, t, w, h) => {
      const cx = w / 2, bedY = h * 0.5;
      const gentleSway = Math.sin(t * 0.8) * 2;
      
      // Bed/table edge
      ctx.fillStyle = "#444";
      ctx.fillRect(cx - 120, bedY, 140, 8);
      
      // Person lying face down
      const headX = cx - 80, headY = bedY - 10;
      const shoulderX = cx - 55, shoulderY = bedY - 4;
      const hipX = cx - 5, hipY = bedY - 2;
      const kneeX = cx + 15, kneeY = bedY + 2;
      
      // Torso on bed
      ctx.strokeStyle = "#e8dcc8";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();
      
      // Leg hanging off edge (extending under gravity)
      const ankleX = kneeX + 10 + gentleSway;
      const ankleY = kneeY + 55 + gentleSway;
      ctx.beginPath();
      ctx.moveTo(kneeX, kneeY);
      ctx.lineTo(ankleX, ankleY);
      ctx.stroke();
      
      // Foot
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ankleX, ankleY);
      ctx.lineTo(ankleX + 5, ankleY + 12);
      ctx.stroke();
      
      // Arms hanging
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(shoulderX - 15, shoulderY + 30);
      ctx.stroke();
      
      // Head
      ctx.fillStyle = "#e8dcc8";
      ctx.beginPath();
      ctx.arc(headX, headY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      // Gravity arrow
      ctx.strokeStyle = "rgba(255, 140, 60, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ankleX + 20, kneeY + 15);
      ctx.lineTo(ankleX + 20, ankleY + 5);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 140, 60, 0.5)";
      ctx.beginPath();
      ctx.moveTo(ankleX + 15, ankleY);
      ctx.lineTo(ankleX + 20, ankleY + 10);
      ctx.lineTo(ankleX + 25, ankleY);
      ctx.fill();
      
      // Label
      ctx.fillStyle = "rgba(255, 140, 60, 0.6)";
      ctx.font = "11px monospace";
      ctx.fillText("gravity", ankleX + 28, ankleY - 5);
    }
  }
];

const phaseColors = {
  2: "#4a9eff",
  3: "#ff8c3c",
  "Keep daily": "#66bb6a"
};

function ExerciseCard({ exercise, isActive, onClick }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      // Draw static frame
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        exercise.animate(ctx, 0.5, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    startTimeRef.current = performance.now();

    const loop = (now) => {
      const t = (now - startTimeRef.current) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      exercise.animate(ctx, t, canvas.width, canvas.height);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isActive, exercise]);

  const phaseLabel = exercise.phase === "Keep daily" ? "Keep daily" : `Phase ${exercise.phase}`;
  const phaseColor = phaseColors[exercise.phase] || "#888";

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        border: isActive ? "1px solid rgba(255,140,60,0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "15px", color: "#e8dcc8", fontFamily: "'DM Sans', sans-serif" }}>
          {exercise.name}
        </h3>
        <span style={{
          fontSize: "10px",
          padding: "2px 8px",
          borderRadius: "10px",
          background: `${phaseColor}22`,
          color: phaseColor,
          fontFamily: "monospace",
          fontWeight: 600,
        }}>
          {phaseLabel}
        </span>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "8px",
        marginBottom: "10px",
      }}>
        <canvas
          ref={canvasRef}
          width={240}
          height={180}
          style={{ display: "block" }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", color: "#aaa", fontFamily: "monospace" }}>{exercise.sets}</span>
        <span style={{ fontSize: "12px", color: "#777" }}>|</span>
        <span style={{ fontSize: "12px", color: "#aaa", fontFamily: "monospace" }}>{exercise.freq}</span>
      </div>

      {isActive && (
        <p style={{
          margin: 0,
          fontSize: "12px",
          color: "rgba(255,140,60,0.8)",
          fontStyle: "italic",
          lineHeight: 1.4,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {exercise.tip}
        </p>
      )}
    </div>
  );
}

export default function ACLPrehabAnimations() {
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? exercises
    : exercises.filter(e => String(e.phase) === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a1a",
      color: "#e8dcc8",
      fontFamily: "'DM Sans', sans-serif",
      padding: "24px 16px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: 600,
          marginBottom: "4px",
          color: "#e8dcc8",
        }}>
          ACL Prehab Exercises
        </h1>
        <p style={{ fontSize: "13px", color: "#888", marginTop: 0, marginBottom: "20px" }}>
          Tap an exercise to animate · Orange highlights show target muscles
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All" },
            { key: "2", label: "Phase 2" },
            { key: "3", label: "Phase 3" },
            { key: "Keep daily", label: "Daily" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: filter === f.key ? "rgba(255,140,60,0.5)" : "rgba(255,255,255,0.12)",
                background: filter === f.key ? "rgba(255,140,60,0.15)" : "transparent",
                color: filter === f.key ? "#ff8c3c" : "#888",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isActive={activeId === ex.id}
              onClick={() => setActiveId(activeId === ex.id ? null : ex.id)}
            />
          ))}
        </div>

        <p style={{
          fontSize: "11px",
          color: "#555",
          marginTop: "24px",
          textAlign: "center",
          lineHeight: 1.5,
        }}>
          Always clear exercises with your physiotherapist before starting.
          <br />Stop if you feel sharp pain or significant swelling.
        </p>
      </div>
    </div>
  );
}
